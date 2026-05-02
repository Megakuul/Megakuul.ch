<script>
    import Quirk from "../Quirk.svelte";
    import Note from "../Note.svelte";
</script>

## Table of Contents

## EKS

### Auto-Mode vs Hard-Mode

AWS EKS has two "Modes": `Auto-Mode` and `Not Auto-Mode` (also referred to as Hard-Mode).


To understand the two modes and their camps, lets quickly visualize a war between three fractions:

- <span><b class="text-amber-400">Auto-Mode Slayers</b> (
    +45 <img alt="complexity control" class="m-0! inline" src="/images/strength.webp"/> |
    +110 <img alt="bootstrap speed" class="m-0! inline" src="/images/ranged_strength.webp"/> |
    +20 <img alt="cost efficiency" class="m-0! inline" src="/images/bombard_strength.webp"/> |
    +60 <img alt="maintenance capability" class="m-0! inline" src="/images/anti_air_strength.webp"/> |
    +5 <img alt="stallman faith" class="m-0! inline" src="/images/religious_strength.webp"/>
)
<br>
Auto-Mode is essentially just a collection of operators that run on the AWS managed control plane.
This includes <b>Karpenter</b>, <b>CSI (EBS)</b>, <b>CNI (VPC)</b>, <b>DNS (CoreDNS)</b>, <b>Loadbalancer (NLB)</b> and <b>Ingress (ALB)</b>.
Because Auto-Mode uses Karpenter you arguably also have managed worker nodes (since Karpenter deploys preconfigured Bottlerocket instances that are also deadlined after 21 days for automatic updates).
</span>

- <span><b class="text-red-400">Hard-Mode Daemons</b> (
    +15 <img alt="complexity control" class="m-0! inline" src="/images/strength.webp"/> |
    +50 <img alt="bootstrap speed" class="m-0! inline" src="/images/ranged_strength.webp"/> |
    +15 <img alt="cost efficiency" class="m-0! inline" src="/images/bombard_strength.webp"/> |
    +30 <img alt="maintenance capability" class="m-0! inline" src="/images/anti_air_strength.webp"/> |
    +5 <img alt="stallman faith" class="m-0! inline" src="/images/religious_strength.webp"/> 
)
<br>
Hard-Mode is effectively just running fully managed AWS control planes for you. 
That's it, everything else must be done manually. You can install the operator integrations for CNI, CSI, Loadbalancer, Ingress by yourself and even run Karpenter on an external Fargate container (though legacy setups often used <a href="https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md">Cluster Autoscaler</a>).
The mentioned integrations can often be installed simplified by enabling "addons"; under the hood this just applies static manifests.
</span>

- <span><b class="text-indigo-400">Baremetal Overlords</b> (
    +55 <img alt="complexity control" class="m-0! inline" src="/images/strength.webp"/> |
    +25 <img alt="bootstrap speed" class="m-0! inline" src="/images/ranged_strength.webp"/> |
    +45 <img alt="cost efficiency" class="m-0! inline" src="/images/bombard_strength.webp"/> |
    +80 <img alt="maintenance capability" class="m-0! inline" src="/images/anti_air_strength.webp"/> |
    +420 <img alt="stallman faith" class="m-0! inline" src="/images/religious_strength.webp"/> 
)
<br>
Baremetal hosting is generally superior. But go explain this to the Worldskills expert committee.
</span>

<b>Legend:</b>
<ul>
    <li class="m-0!"><img alt="complexity control" class="m-0! inline" src="/images/strength.webp"/> Complexity Control</li>
    <li class="m-0!"><img alt="bootstrap speed" class="m-0! inline" src="/images/ranged_strength.webp"/> Bootstrap Speed</li>
    <li class="m-0!"><img alt="cost efficiency" class="m-0! inline" src="/images/bombard_strength.webp"/> Cost Efficiency</li>
    <li class="m-0!"><img alt="maintenance capability" class="m-0! inline" src="/images/anti_air_strength.webp"/> Maintenance Capability</li>
    <li class="m-0!"><img alt="stallman faith" class="m-0! inline" src="/images/religious_strength.webp"/> Stallman Faith</li>
</ul>

### Update Responsibility

For both `Hard-` and `Auto-Mode` AWS effectively just takes responsibility for updating the control planes.
In `Auto-Mode` this includes updating "Cluster Components" (CNI, CSI, etc...) and the worker node operating system (as dependency of the control plane Karpenter component).

In `Hard-Mode` you have to update everything by yourself (CNI, CSI, etc... Kubernetes operators / addons).

### IAM Access (into the Cluster)

The primary way to access the EKS cluster with IAM credentials is to use this:

```bash
aws eks update-kubeconfig --name yourcluster
```

This creates a `~/.kube/config` which uses the AWS CLI to generate STS tokens that are approved by the EKS control plane authenticator.

To map a subject to the role use `iam access entries`:

```bash

```
*(notice that there is a cool UI to manage this in the EKS cluster "access" tab)*


Besides this basic IAM access AWS also provides you with the option of associating an OIDC provider with the control plane.
Under the hood this creates an OIDC trust on the control plane, therefore, you can use it like a normal Kubernetes OIDC provider (just use `sub` claims to match on k8s user). 

<Note type="note">
Don't confuse the <b>OIDC identity providers</b> tab on the UI with the IAM integration, this is what you are looking for in this section! 
</Note>

### IAM Integration (out of the Cluster)

There are two types of IAM integration in EKS:

1. **IRSA** (Illuminati-Resolution-Special-Agency) 🪬: IAM roles for service accounts is the basic process of adding the EKS cluster OIDC URL as new identity provider in IAM (audience `sts.amazonaws.com`). This ensures that your pod can use the default `sts:AssumeRoleWithWebIdentity` call to jump to a role with a trust policy like this: 
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::111122223333:oidc-provider/oidc.eks.region.amazonaws.com/id/youeksiamprovider"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.region.amazonaws.com/id/youeksiamprovider:sub": "system:serviceaccount:somenamespace:someserviceaccount",
          "oidc.eks.region.amazonaws.com/id/youeksiamprovider:aud": "sts.amazonaws.com"
        }
      }
    }
  ]
}
```

**IRSA** uses an in-cluster mutating admission controller ([this one](https://github.com/aws/amazon-eks-pod-identity-webhook)) that checks the serviceaccount annotation `eks.amazonaws.com/role-arn` on pod creation and injects the projected sa token including env variables to instruct the AWS SDK automatically. In short: add `serviceAccountName: myserviceaccount` and it just works 🪄


2. **Pod Identity** 👺: A new system that maps service accounts directly to roles. This system does NOT require an IAM `sts:AssumeRoleWithWebIdentity` jump (though the AWS SDK uses an HTTP call to a local `pod identity agent` which itself uses `sts:AssumeRoleForPodIdentity` under the hood). In this system you grant the `pod.eks.amazonaws.com` service full access to assume your role but create the explicit service account to role bindings in a mystical new API (similar to how GCP bindings work):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "pods.eks.amazonaws.com"
            },
            "Action": [
                "sts:AssumeRole",
                "sts:TagSession"
            ]
        }
    ]
}
```
```bash
aws eks create-pod-identity-association \
    --cluster-name supercluster --namespace somenamespace --service-account someserviceaccount \
    --role-arn arn:aws:iam::111122223333:role/SuperRole
```

<Note type="warning">
<b>HOT TAKE</b>: In my personal opinion pod identity should not be used...
AWS declares it the best practice and the modern "successor", however it looks more like GCP garbage instead of the clean IAM approach I know from Mr. Bezos. 

Jokes aside, I actually don't recommend it, it detaches permissions and splits them up into two places: the mysterious bindings and the IAM roles.
I believe this completely misses the primary centralized IAM approach that makes the AWS IAM so appealing...
</Note>


### Auto-Mode loves Systemd

An important detail to understand is that Auto-Mode deploys many of its preconfigured services on worker nodes (most notably the `coredns.service`, `eks-pod-identity-agent.service`, `aws-node.service` / `ipamd.service` (VPC) and `ebs-plugin.service`) with systemd. This is different from `Hard-Mode` where are usually deployed as `DaemonSets`.


### ArgoCDrrrrrrrr 🪼

Before we start doing stupid things, lets dive into an example for how to PROPERLY operate EKS 🔥

In this example I will use the ArgoCD capability that can be enabled on the AWS console (costs 20$ per month; it is recommended to preemptively reserve a spot under your favorite bridge).

The capability installs ArgoCD conveniently auto-managed on the control plane and integrates quite good with `IAM Identity Center` for authentication.

After setting up ArgoCD you can apply the following secret with kubectl to add the local cluster to ArgoCD:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: local-cluster
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: cluster
stringData:
  name: local-cluster
  server: arn:aws:eks:us-east-1:1111111111:cluster/acme # change with your cluster arn
  project: default
```

Now you can add an `app-of-app` project pointing to your CodeCommit repository (for this access to work, simply provide the Argo Capability Role with `codecommit:GitPull` access for the repository).

You will probably notice that ArgoCD will fail the deployment because it lacks Kubernetes resource access, to fix this, simply associate the Argo Capability Role with a higher privileged policy like `AmazonEKSClusterAdminPolicy` (can also be done via AWS console very conveniently in the `Access` tab).

### Arctic Zonal Shift 🥶

EKS provides a feature that is called `ARC Zonal Shift`. While this sounds extremely fancy and magical, it is simply an `ALB` / `NLB` feature which disables DNS traffic routing to loadbalancer instances in impaired zones.

### Metric Server

EKS like most k8s distros deploys the `metrics-server` used to aggregate data (which can be queried via delegated call to `kube-api-server` e.g. via `kubectl top pods`) on the worker-nodes.

<Note type="caution">
<b>Caution</b>: In Auto-Mode the metrics-server pods use <b>nodeSelector.karpenter.sh/nodepool: system</b> which requires a NodePool with the name <b>system</b> to exist.
</Note>

### Prefix Delegation 👔

By default the AWS VPC CNI suffers a large IP problem: because no virtual network is used, every pod in the cluster requires a VPC IP. Unfortunately many smaller EC2 instances have ENIs that only support a limited amount of IPs (t4g.micro has 4 for example).

To fix this they introduced `Prefix Delegation` this is an ENI feature that allows the network card to allocate `/28` (16 addrs) blocks per IP slot (not supported on primary slot though).

To enable it edit the EKS VPC addon like this:

```bash
aws eks update-addon \
  --cluster-name <yourclustername> \
  --addon-name vpc-cni \
  --configuration-values '{"env":{"ENABLE_PREFIX_DELEGATION":"true"}}'
```

### Security Group per Pod

EKS allows every pod to use a VPC security group (best practice, but rarely used due to complexity and missing integration into the Kubernetes selector system).

To enable this feature you have to set an env variable on the VPC CNI Addon called `ENABLE_POD_ENI=true`. This ensures the VPC CNI controller attaches a trunk ENI called `aws-k8s-trunk-eni` for ENI branching (notice that this requires the `AmazonEKSVPCResourceController` policy attached to the cluster role).

Finally you can attach security groups to pods by creating a `SecurityGroupPolicy`:
```bash
apiVersion: vpcresources.k8s.aws/v1beta1
kind: SecurityGroupPolicy
metadata:
  name: nginx-sg
  namespace: nginx
spec:
  podSelector:
    matchLabels:
      app: nginx
  securityGroups:
    groupIds:
      - sg-0ab957a55b30d8ae2 # replace with your sg
```

*Notice that pods without matching `SecurityGroupPolicy` operate normally and don't necessarily use the branch ENI.*

For further information check out [this article](https://docs.aws.amazon.com/eks/latest/best-practices/sgpp.html).

## Common Issues

- Karpenter Nodepool Event (`DisruptionBlocked`) `Nodeclaim does not have an associated node`: Wait 10-20 minutes, after bootstrapping an EKS cluster it can take some time to deploy.
- Kubernetes Clusterjoin fails: Analyze the `kubelet` service on the node.

## References

- [Auto-Mode workshop](https://catalog.workshops.aws/workshops/aadbd25d-43fa-4ac3-ae88-32d729af8ed4) for EKS (overly explicit)
- [PA Sports explaining EKS Pod Identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html)