## Table of Contents

## IAM

- Root account has MFA
- No stale/unused IAM user access keys lying around
- IAM Access Analyzer enabled

## VPC & Networking

- Flow logs enabled on every VPC
- NAT Gateway per AZ, not a single shared one
- Security groups have no `0.0.0.0/0` on anything but 80/443
- Gateway VPC endpoints for S3 and DynamoDB

## EC2 & Auto Scaling

- IMDSv2 enforced (`HttpTokens: required`)
- EBS volumes encrypted at rest
- ASG spans multiple AZs
- ASG health check type set to `ELB`, not just `EC2`

## Elastic Load Balancing

- Deletion protection enabled
- Access logs enabled
- HTTP listener redirects to HTTPS
- Cross-zone load balancing enabled
- WAF Web ACL attached (ALB)

## S3

- Block Public Access enabled
- Versioning enabled
- Object Lock enabled at bucket creation (only doable then, safe to flip even with no retention set yet)
- MFA delete enabled (needs root credentials + MFA to delete afterward, know that before you turn it on)

## CloudFront

- Viewer protocol policy is HTTPS-only
- Origin Access Control used for S3 origins (bucket stays private)
- WAF Web ACL attached
- Logging enabled

## Route 53

- Alias records used instead of CNAME for AWS targets

## RDS & Aurora

- Multi-AZ enabled
- Backup retention > 0 (PITR possible)
- Encryption at rest enabled
- Deletion protection enabled
- Not publicly accessible

## DynamoDB

- Point-in-time recovery enabled
- Encryption at rest enabled

## ElastiCache

- Multi-AZ with automatic failover enabled
- Encryption in transit and at rest enabled
- AUTH token configured
- Automatic backups enabled

## Lambda

- Dead-letter queue / on-failure destination configured
- Secrets pulled from Secrets Manager/SSM, not plaintext env vars
- Alias/version used in production, not `$LATEST`
- X-Ray tracing enabled

## API Gateway

- Throttling limits set
- Access/execution logging enabled
- WAF Web ACL attached
- Authorizer enforced on every non-public route

## SQS & SNS

- Dead-letter queue configured
- Encryption at rest enabled
- SNS subscriptions have a DLQ for failed deliveries

## EventBridge & Step Functions

- Dead-letter queue configured on rules/targets
- Step Functions logging to CloudWatch enabled

## EKS

- Control plane logging enabled for all log types (off by default)
- Secrets envelope-encrypted with a KMS key (off by default)
- API endpoint access restricted
- IRSA / Pod Identity used for pod AWS access, not the node role

## KMS, Secrets Manager & SSM Parameter Store

- KMS key rotation enabled (off by default)
- Sensitive SSM parameters are `SecureString`, not plain `String`
- Secrets Manager rotation enabled

## ACM & WAF

- Certificates use DNS validation (auto-renewal)
- Managed rule groups attached

## GuardDuty & Security Hub

- GuardDuty enabled (purely detective, off by default)
- Security Hub enabled to aggregate the findings

## CloudTrail & Config

- Multi-region trail enabled (single-region by default)
- Log file validation enabled
- AWS Config recorder enabled

## CloudWatch & Logging

- Log group retention set (default is "Never expire")
- Alarm on DLQ depth / error rate for critical paths

## Backup

- AWS Backup plan covers every stateful resource in scope
- Vault lock enabled (doesn't touch existing backups, just stops anyone deleting them early)

## Cognito

- MFA enabled/enforced on the user pool
- Advanced security features on (compromised credentials, adaptive auth)
