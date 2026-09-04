/** Raw Kubernetes/EKS snippet catalogue. Highlighted at build time in +page.server.ts.
 *
 * Rules for the blobs: no backticks and no backslashes so they survive being stored
 * inside template literals verbatim.
 */

export interface Snippet {
  id: string;
  title: string;
  /** Short plain-text hint rendered above the code. */
  note?: string;
  code: string;
  /** shiki lang, defaults to 'yaml'. */
  lang?: string;
}

export interface Group {
  id: string;
  title: string;
  blurb: string;
  snippets: Snippet[];
}

const access: Group = {
  id: 'access',
  title: 'Cluster access',
  blurb: 'Get kubectl talking to the cluster, then grant another IAM principal control-plane access.',
  snippets: [
    {
      id: 'access-login',
      title: 'Log in to EKS',
      lang: 'bash',
      code: `aws eks update-kubeconfig --region eu-central-1 --name my-cluster --alias my-cluster
kubectl config current-context
kubectl get nodes`,
    },
    {
      id: 'access-entry',
      title: 'Grant a role control-plane access (access entries)',
      note: 'Access entries replace the old aws-auth ConfigMap. An AWS-managed access policy needs no RBAC on the k8s side; a plain kubernetes-groups mapping needs a ClusterRoleBinding to mean anything.',
      lang: 'bash',
      code: `aws eks create-access-entry \\
  --cluster-name my-cluster \\
  --principal-arn arn:aws:iam::111122223333:role/my-role \\
  --type STANDARD

aws eks associate-access-policy \\
  --cluster-name my-cluster \\
  --principal-arn arn:aws:iam::111122223333:role/my-role \\
  --policy-arn arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy \\
  --access-scope type=cluster

aws eks list-access-entries --cluster-name my-cluster
aws eks describe-access-entry --cluster-name my-cluster --principal-arn arn:aws:iam::111122223333:role/my-role`,
    },
  ],
};

const helpers: Group = {
  id: 'helpers',
  title: 'kubectl troubleshooting toolbox',
  blurb: 'One-liners for figuring out why a pod or a node is not doing what it should.',
  snippets: [
    {
      id: 'helpers-toolbox',
      title: 'The commands you reach for first',
      lang: 'bash',
      code: `kubectl get nodes -o wide
kubectl top nodes
kubectl top pods -A
kubectl get pods -A -o wide
kubectl get events -A --sort-by=.lastTimestamp
kubectl describe pod my-pod                          # reason for Pending / CrashLoopBackOff / ImagePullBackOff
kubectl logs -f my-pod -c my-container --previous     # --previous survives a crash restart
kubectl exec -it my-pod -- sh
kubectl get nodeclaims                                # karpenter: nodes it launched or is launching
kubectl describe nodeclaim my-nodeclaim
kubectl get nodepools
kubectl get ec2nodeclasses
kubectl rollout status deployment/my-app
kubectl rollout history deployment/my-app
kubectl rollout undo deployment/my-app
kubectl get pvc,pv
kubectl get sc
kubectl get sa,rolebinding,clusterrolebinding -A | grep my-app
kubectl drain node-1 --ignore-daemonsets --delete-emptydir-data
kubectl cordon node-1
kubectl uncordon node-1
kubectl api-resources
kubectl explain deployment.spec.template`,
    },
  ],
};

const workloads: Group = {
  id: 'workloads',
  title: 'Workloads',
  blurb: 'Templates to get an app onto the cluster: a bare Pod, a Deployment, a StatefulSet, and how to expose them.',
  snippets: [
    {
      id: 'wl-pod',
      title: 'Pod',
      code: `apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  labels:
    app: my-app
spec:
  containers:
    - name: app
      image: 111122223333.dkr.ecr.eu-central-1.amazonaws.com/my-app:latest
      ports:
        - containerPort: 8080
      resources:
        requests: { cpu: 100m, memory: 128Mi }
        limits: { cpu: 500m, memory: 256Mi }
      env:
        - name: ENV
          value: prod
      readinessProbe:
        httpGet: { path: /health, port: 8080 }
        initialDelaySeconds: 5
      livenessProbe:
        httpGet: { path: /health, port: 8080 }
        periodSeconds: 10`,
    },
    {
      id: 'wl-deployment',
      title: 'Deployment + Service (ClusterIP)',
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels: { app: my-app }
  template:
    metadata:
      labels: { app: my-app }
    spec:
      containers:
        - name: app
          image: 111122223333.dkr.ecr.eu-central-1.amazonaws.com/my-app:latest
          ports:
            - containerPort: 8080
          resources:
            requests: { cpu: 100m, memory: 128Mi }
            limits: { cpu: 500m, memory: 256Mi }
---
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  type: ClusterIP
  selector: { app: my-app }
  ports:
    - port: 80
      targetPort: 8080`,
    },
    {
      id: 'wl-statefulset',
      title: 'StatefulSet + headless Service',
      note: 'volumeClaimTemplates mints one PVC per replica (data-my-db-0, data-my-db-1, ...), see the storage section below for the StorageClass. This plain PostgreSQL example deliberately uses one replica; use a replication-aware operator before scaling it. The inline Secret is only a runnable placeholder—replace it with a managed secret before real use.',
      code: `apiVersion: v1
kind: Secret
metadata:
  name: my-db
type: Opaque
stringData:
  password: change-me-now
---
apiVersion: v1
kind: Service
metadata:
  name: my-db
spec:
  clusterIP: None
  selector: { app: my-db }
  ports:
    - port: 5432
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: my-db
spec:
  serviceName: my-db
  replicas: 1
  selector:
    matchLabels: { app: my-db }
  template:
    metadata:
      labels: { app: my-db }
    spec:
      containers:
        - name: db
          image: postgres:16
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef: { name: my-db, key: password }
            - name: PGDATA
              value: /var/lib/postgresql/data/pgdata
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: [ReadWriteOnce]
        storageClassName: ebs-sc
        resources:
          requests: { storage: 20Gi }`,
    },
    {
      id: 'wl-lb-service',
      title: 'Service (internet-facing NLB)',
      note: 'Needs the AWS Load Balancer Controller installed. Swap scheme to internal for a private NLB.',
      code: `apiVersion: v1
kind: Service
metadata:
  name: my-app
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: external
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
spec:
  type: LoadBalancer
  selector: { app: my-app }
  ports:
    - port: 80
      targetPort: 8080`,
    },
    {
      id: 'wl-ingress',
      title: 'Ingress (ALB)',
      note: 'Also needs the AWS Load Balancer Controller. One ALB gets shared across every Ingress with the same group.name annotation.',
      code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
spec:
  ingressClassName: alb
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app
                port: { number: 80 }`,
    },
  ],
};

const identity: Group = {
  id: 'identity',
  title: 'IAM for pods',
  blurb: 'Give a pod real AWS permissions without baking credentials into it, both ways EKS supports.',
  snippets: [
    {
      id: 'id-oidc-provider',
      title: 'Associate an OIDC provider with the cluster (IRSA prerequisite, once per cluster)',
      note: 'IRSA does not work until this exists. eksctl discovers the cluster issuer and current CA thumbprint, and --approve idempotently creates the provider when it is missing.',
      lang: 'bash',
      code: `eksctl utils associate-iam-oidc-provider \\
  --cluster my-cluster \\
  --region eu-central-1 \\
  --approve

aws eks describe-cluster --name my-cluster --region eu-central-1 --query "cluster.identity.oidc.issuer" --output text
aws iam list-open-id-connect-providers`,
    },
    {
      id: 'id-irsa',
      title: 'IRSA (IAM Roles for Service Accounts)',
      note: 'Needs the OIDC provider above associated with the cluster first.',
      lang: 'bash',
      code: `cat > trust.json <<'JSON'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::111122223333:oidc-provider/oidc.eks.eu-central-1.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "oidc.eks.eu-central-1.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE:sub": "system:serviceaccount:default:my-app",
        "oidc.eks.eu-central-1.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE:aud": "sts.amazonaws.com"
      }
    }
  }]
}
JSON

aws iam create-role --role-name my-app-irsa --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name my-app-irsa --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`,
    },
    {
      id: 'id-irsa-sa',
      title: 'IRSA ServiceAccount',
      code: `apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::111122223333:role/my-app-irsa
---
# reference it from the pod spec:
# spec:
#   serviceAccountName: my-app`,
    },
    {
      id: 'id-pod-identity',
      title: 'EKS Pod Identity',
      note: 'No OIDC needed, and the trust policy is identical for every role: trust the pods.eks.amazonaws.com service. Needs the "Amazon EKS Pod Identity Agent" addon on the cluster.',
      lang: 'bash',
      code: `cat > trust.json <<'JSON'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "pods.eks.amazonaws.com" },
    "Action": ["sts:AssumeRole", "sts:TagSession"]
  }]
}
JSON

aws iam create-role --role-name my-app-pod-identity --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name my-app-pod-identity --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

aws eks create-pod-identity-association \\
  --cluster-name my-cluster \\
  --namespace default \\
  --service-account my-app \\
  --role-arn arn:aws:iam::111122223333:role/my-app-pod-identity

aws eks list-pod-identity-associations --cluster-name my-cluster`,
    },
    {
      id: 'id-pod-identity-sa',
      title: 'Pod Identity ServiceAccount',
      note: 'No annotation needed, the association above is what does the binding.',
      code: `apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app`,
    },
  ],
};

const storage: Group = {
  id: 'storage',
  title: 'Storage',
  blurb: 'Mount an EBS volume for one pod at a time, or an EFS volume shared across many.',
  snippets: [
    {
      id: 'st-ebs',
      title: 'EBS volume (ReadWriteOnce)',
      note: 'Needs the "Amazon EBS CSI Driver" addon, with a role (IRSA or Pod Identity) attached to its service account carrying AmazonEBSCSIDriverPolicy.',
      code: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-sc
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
parameters:
  type: gp3
  encrypted: "true"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-data
spec:
  accessModes: [ReadWriteOnce]
  storageClassName: ebs-sc
  resources:
    requests: { storage: 10Gi }
---
# mount it in a pod:
# spec:
#   containers:
#     - name: app
#       volumeMounts:
#         - name: data
#           mountPath: /data
#   volumes:
#     - name: data
#       persistentVolumeClaim:
#         claimName: my-data`,
    },
    {
      id: 'st-efs',
      title: 'EFS volume (ReadWriteMany, shared)',
      note: 'Needs the "Amazon EFS CSI Driver" addon, AmazonEFSCSIDriverPolicy on its controller service account, and an EFS filesystem with mount targets in the node subnets.',
      code: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: efs-sc
provisioner: efs.csi.aws.com
parameters:
  provisioningMode: efs-ap
  fileSystemId: fs-0123456789abcdef0
  directoryPerms: "700"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-data
spec:
  accessModes: [ReadWriteMany]
  storageClassName: efs-sc
  resources:
    requests: { storage: 5Gi }`,
    },
  ],
};

const karpenter: Group = {
  id: 'karpenter',
  title: 'Karpenter',
  blurb: 'Node autoscaling: an EC2NodeClass describes the instances, a NodePool decides when and which ones to launch. Example provisions arm64 (Graviton) spot capacity.',
  snippets: [
    {
      id: 'kp-nodeclass',
      title: 'EC2NodeClass (arm64)',
      code: `apiVersion: karpenter.k8s.aws/v1
kind: EC2NodeClass
metadata:
  name: arm64
spec:
  amiSelectorTerms:
    - alias: al2023@latest
  role: KarpenterNodeRole-my-cluster
  subnetSelectorTerms:
    - tags: { karpenter.sh/discovery: my-cluster }
  securityGroupSelectorTerms:
    - tags: { karpenter.sh/discovery: my-cluster }
  blockDeviceMappings:
    - deviceName: /dev/xvda
      ebs:
        volumeSize: 50Gi
        volumeType: gp3
        encrypted: true`,
    },
    {
      id: 'kp-nodepool',
      title: 'NodePool (arm64, spot-first)',
      code: `apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: arm64-spot
spec:
  template:
    spec:
      nodeClassRef:
        group: karpenter.k8s.aws
        kind: EC2NodeClass
        name: arm64
      requirements:
        - key: kubernetes.io/arch
          operator: In
          values: [arm64]
        - key: karpenter.sh/capacity-type
          operator: In
          values: [spot, on-demand]
        - key: karpenter.k8s.aws/instance-category
          operator: In
          values: [c, m, r]
  limits:
    cpu: 100
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 30s`,
    },
  ],
};

export const groups: Group[] = [access, helpers, workloads, identity, storage, karpenter];

export default groups;
