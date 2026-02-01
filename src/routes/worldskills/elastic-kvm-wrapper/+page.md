<script>
    import Quirk from "../Quirk.svelte";
</script>

## Table of Contents


## Quirks

- Console does not accept security group if the VPCs got entered manually. *"Please select a security group that has EC2 scope."*
![vpc_sg_permission_issue](/images/vpc_sg_permission_issue.png)

<Quirk score={9.6}>
Add <b>"ec2:DescribeVpcs"</b> and <b>"ec2:DescribeSubnets"</b> access to the principal and select the VPC/Subnet from the dropdown or create the instance via cli.
</Quirk>


- `ec2:DescribeImages,DescribeVpcs,...` and many more cannot be resource scoped 

<Quirk score={6.7}>
Accept it, use <b>"Resource": "*"</b> and don't take this as an example for a professional API design. 
</Quirk>


- The EC2 instance console does NOT display security groups of secondary ENI interfaces attached after instance launch.
![ec2_eni_sg_missing](/images/ec2_eni_sg_missing.png)

<Quirk score={10.5}>
Use the ENI console section to configure security groups.
</Quirk>


