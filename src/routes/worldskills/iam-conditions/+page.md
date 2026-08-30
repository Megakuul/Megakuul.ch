## Global condition keys

| Key                          | Category  | Value                                                                                                                      |
| ---------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `aws:PrincipalArn`           | Principal | ARN of the calling principal                                                                                               |
| `aws:PrincipalAccount`       | Principal | Account ID of the calling principal                                                                                        |
| `aws:PrincipalOrgID`         | Principal | Org ID the principal belongs to                                                                                            |
| `aws:PrincipalOrgPaths`      | Principal | Org path of the principal (list)                                                                                           |
| `aws:PrincipalTag/<tag-key>` | Principal | Value of tag `<tag-key>` on the principal (dynamic key)                                                                    |
| `aws:PrincipalIsAWSService`  | Principal | `true` \| `false`                                                                                                          |
| `aws:PrincipalServiceName`   | Principal | Service principal name, e.g. `cloudtrail.amazonaws.com`                                                                    |
| `aws:PrincipalType`          | Principal | `Account` \| `User` \| `FederatedUser` \| `AssumedRole` \| `Anonymous`                                                     |
| `aws:userid`                 | Principal | Unique principal ID string                                                                                                 |
| `aws:username`               | Principal | IAM user name                                                                                                              |
| `aws:FederatedProvider`      | Session   | `cognito-identity.amazonaws.com` \| `www.amazon.com` \| `graph.facebook.com` \| `accounts.google.com` \| OIDC provider ARN |
| `aws:TokenIssueTime`         | Session   | ISO 8601 timestamp                                                                                                         |
| `aws:MultiFactorAuthPresent` | Session   | `true` \| `false`                                                                                                          |
| `aws:MultiFactorAuthAge`     | Session   | Seconds since MFA, numeric                                                                                                 |
| `aws:SourceIdentity`         | Session   | String set via `sts:SourceIdentity` on `AssumeRole`                                                                        |
| `ec2:SourceInstanceArn`      | Session   | ARN of the EC2 instance the credentials were delivered to                                                                  |
| `ec2:RoleDelivery`           | Session   | `1.0` \| `2.0` (IMDS version)                                                                                              |
| `lambda:SourceFunctionArn`   | Session   | ARN of the Lambda function                                                                                                 |
| `codebuild:BuildArn`         | Session   | ARN of the CodeBuild build                                                                                                 |
| `codebuild:ProjectArn`       | Session   | ARN of the CodeBuild project                                                                                               |
| `ssm:SourceInstanceArn`      | Session   | ARN of the SSM managed instance                                                                                            |
| `aws:SourceIp`               | Network   | IPv4/IPv6 address                                                                                                          |
| `aws:VpcSourceIp`            | Network   | Private IPv4/IPv6 address inside a VPC                                                                                     |
| `aws:SourceVpc`              | Network   | VPC ID                                                                                                                     |
| `aws:SourceVpcArn`           | Network   | VPC ARN                                                                                                                    |
| `aws:SourceVpce`             | Network   | VPC endpoint ID                                                                                                            |
| `aws:VpceAccount`            | Network   | Account ID owning the VPC endpoint                                                                                         |
| `aws:VpceOrgID`              | Network   | Org ID owning the VPC endpoint                                                                                             |
| `aws:ResourceAccount`        | Resource  | Account ID of the resource                                                                                                 |
| `aws:ResourceOrgID`          | Resource  | Org ID of the resource                                                                                                     |
| `aws:ResourceTag/<tag-key>`  | Resource  | Value of tag `<tag-key>` on the resource (dynamic key)                                                                     |
| `aws:CurrentTime`            | Request   | ISO 8601 timestamp                                                                                                         |
| `aws:EpochTime`              | Request   | Unix seconds, numeric                                                                                                      |
| `aws:RequestedRegion`        | Request   | AWS region code, e.g. `eu-central-1`                                                                                       |
| `aws:SecureTransport`        | Request   | `true` \| `false`                                                                                                          |
| `aws:UserAgent`              | Request   | `User-Agent` HTTP header value                                                                                             |
| `aws:referer`                | Request   | `Referer` HTTP header value                                                                                                |
| `aws:CalledVia`              | Request   | List of AWS service principals in the call chain                                                                           |
| `aws:CalledViaFirst`         | Request   | First service principal in the call chain                                                                                  |
| `aws:CalledViaLast`          | Request   | Last service principal in the call chain                                                                                   |
| `aws:ViaAWSService`          | Request   | `true` \| `false`                                                                                                          |
| `aws:SourceArn`              | Request   | ARN of the resource that triggered the call                                                                                |
| `aws:SourceAccount`          | Request   | Account ID of the resource that triggered the call                                                                         |
| `aws:RequestTag/<tag-key>`   | Request   | Value of tag `<tag-key>` being set in the request (dynamic key)                                                            |
| `aws:TagKeys`                | Request   | List of tag keys present in the request                                                                                    |

## Service-specific keys with fixed value sets

| Key                                  | Value                                                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `ec2:CreateAction`                   | Name of the EC2 API action creating the resource, e.g. `RunInstances`, `CreateVolume`, `CreateSecurityGroup`                    |
| `s3:x-amz-acl`                       | `private` \| `public-read` \| `public-read-write` \| `authenticated-read` \| `bucket-owner-read` \| `bucket-owner-full-control` |
| `s3:x-amz-storage-class`             | `STANDARD` \| `STANDARD_IA` \| `ONEZONE_IA` \| `INTELLIGENT_TIERING` \| `GLACIER` \| `GLACIER_IR` \| `DEEP_ARCHIVE`             |
| `www.amazon.com:user_id`             | `user_id` claim from a Login with Amazon token                                                                                  |
| `www.amazon.com:app_id`              | `app_id` claim from a Login with Amazon token                                                                                   |
| `graph.facebook.com:app_id`          | `app_id` claim from a Facebook token                                                                                            |
| `accounts.google.com:sub`            | `sub` claim from a Google token                                                                                                 |
| `cognito-identity.amazonaws.com:aud` | Cognito identity pool ID                                                                                                        |
| `cognito-identity.amazonaws.com:sub` | Cognito identity ID (per user)                                                                                                  |
| `cognito-identity.amazonaws.com:amr` | Auth method list, e.g. `["authenticated", "cognito-identity.amazonaws.com"]`                                                    |

## All service-specific condition keys

### a4b

| Key                      | Value           | Description                                           |
| ------------------------ | --------------- | ----------------------------------------------------- |
| `a4b:amazonId`           | string          | Filters actions based on the Amazon Id in the request |
| `a4b:filters_deviceType` | list of strings | —                                                     |

### account

| Key                                        | Value           | Description                                                                             |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------- |
| `account:AccountResourceOrgPaths`          | list of strings | Filters access by the resource path for an account in an organization                   |
| `account:AccountResourceOrgTags/${TagKey}` | string          | Filters access by resource tags for an account in an organization                       |
| `account:AlternateContactTypes`            | list of strings | Filters access by alternate contact types                                               |
| `account:EmailTargetDomain`                | string          | Filters access by email domain of the target email address                              |
| `account:TargetRegion`                     | string          | Filters access by a list of Regions. Enables or disables all the Regions specified here |

### acm

| Key                                  | Value           | Description                                                                                                                  |
| ------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `acm:CertificateAuthority`           | string          | —                                                                                                                            |
| `acm:CertificateKeyPairOrigin`       | string          | —                                                                                                                            |
| `acm:CertificateTransparencyLogging` | string          | —                                                                                                                            |
| `acm:DomainNames`                    | list of strings | Filters access by domainNames in the request. This key can be used to restrict which domains can be in certifica te requests |
| `acm:Export`                         | string          | Filters access by the export option in the request. Can be used to restrict creation of certificates that can be exported    |
| `acm:KeyAlgorithm`                   | string          | Filters access by keyAlgorithm in the request                                                                                |
| `acm:ValidationMethod`               | string          | Filters access by validationMethod in the request. Default 'EMAIL' if no key is present in the request                       |

### acm-pca

| Key                   | Value | Description                                                                             |
| --------------------- | ----- | --------------------------------------------------------------------------------------- |
| `acm-pca:TemplateArn` | ARN   | Filters access by the arn of the certificate template used in Issue Certificate request |

### agent-registry

| Key                                   | Value  | Description |
| ------------------------------------- | ------ | ----------- |
| `agent-registry:RecordCreatorAccount` | string | —           |

### agentaccess-mcp

| Key                        | Value | Description                                                     |
| -------------------------- | ----- | --------------------------------------------------------------- |
| `agentaccess-mcp:StackArn` | ARN   | Filters access by the ARN of the WorkSpaces Applicati ons stack |

### airflow

| Key                       | Value           | Description |
| ------------------------- | --------------- | ----------- |
| `airflow:DagAccessEntity` | string          | —           |
| `airflow:ResourceAction`  | string          | —           |
| `airflow:ResourceId`      | string          | —           |
| `airflow:ResourceType`    | string          | —           |
| `airflow:TeamNames`       | list of strings | —           |

### amplifyuibuilder

| Key                                                  | Value  | Description                                    |
| ---------------------------------------------------- | ------ | ---------------------------------------------- |
| `amplifyuibuilder:CodegenJobResourceAppId`           | string | Filters access by the app ID                   |
| `amplifyuibuilder:CodegenJobResourceEnvironmentName` | string | Filters access by the backend environment name |
| `amplifyuibuilder:CodegenJobResourceId`              | string | —                                              |
| `amplifyuibuilder:ComponentResourceAppId`            | string | Filters access by the app ID                   |
| `amplifyuibuilder:ComponentResourceEnvironmentName`  | string | Filters access by the backend environment name |
| `amplifyuibuilder:ComponentResourceId`               | string | Filters access by the component ID             |
| `amplifyuibuilder:FormResourceAppId`                 | string | Filters access by the app ID                   |
| `amplifyuibuilder:FormResourceEnvironmentName`       | string | Filters access by the backend environment name |
| `amplifyuibuilder:FormResourceId`                    | string | Filters access by the form ID                  |
| `amplifyuibuilder:ThemeResourceAppId`                | string | Filters access by the app ID                   |
| `amplifyuibuilder:ThemeResourceEnvironmentName`      | string | Filters access by the backend environment name |
| `amplifyuibuilder:ThemeResourceId`                   | string | Filters access by the theme ID                 |

### aoss

| Key                     | Value  | Description                                        |
| ----------------------- | ------ | -------------------------------------------------- |
| `aoss:CollectionId`     | string | Filters access by the identifier of the collection |
| `aoss:collection`       | string | Filters access by the collection name              |
| `aoss:collection-group` | string | Filters access by the collection group name        |
| `aoss:index`            | string | Filters access by the index                        |

### apigateway

| Key                                                         | Value              | Description                                                                                                                                                                                                          |
| ----------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apigateway:Request/AccessAssociationSource`                | string             | Filters access by access association source. Available during the CreateDomainNameAccessAssociation operation                                                                                                        |
| `apigateway:Request/AccessLoggingDestination`               | string             | Filters access by access log destination. Available during the CreateStage and UpdateStage operations                                                                                                                |
| `apigateway:Request/AccessLoggingFormat`                    | string             | Filters access by access log format. Available during the CreateStage and UpdateStage operations                                                                                                                     |
| `apigateway:Request/ApiKeyRequired`                         | list of true/false | Filters access by the requirement of API. Available during the CreateRoute and UpdateRoute operations. Also available as a collection during import and reimport                                                     |
| `apigateway:Request/ApiName`                                | string             | Filters access by API name. Available during the CreateApi and UpdateApi operations                                                                                                                                  |
| `apigateway:Request/AuthorizerType`                         | list of strings    | Filters access by type of authorizer in the request, for example REQUEST or JWT. Available during CreateAut horizer and UpdateAuthorizer. Also available during import and reimport as an                            |
| `apigateway:Request/AuthorizerUri`                          | list of strings    | Filters access by URI of a Lambda authorizer function. Available during CreateAuthorizer and UpdateAut horizer. Also available during import and reimport as an                                                      |
| `apigateway:Request/CognitoUserPoolArn`                     | ARN                | —                                                                                                                                                                                                                    |
| `apigateway:Request/ConditionBasePaths`                     | list of strings    | Filters access by base paths defined on the condition of a routing rule. Available during the CreateRoutingRule and UpdateRoutingRule operations                                                                     |
| `apigateway:Request/DisableExecuteApiEndpoint`              | true / false       | Filters access by status of the default execute-api endpoint. Available during the CreateApi and UpdateApi operations                                                                                                |
| `apigateway:Request/DomainNameArn`                          | ARN                | Filters access by domain name ARN. Available during the CreateDomainNameAccessAssociation operation                                                                                                                  |
| `apigateway:Request/EndpointType`                           | list of strings    | Filters access by endpoint type. Available during the CreateDomainName, UpdateDomainName, CreateApi, and UpdateApi operations                                                                                        |
| `apigateway:Request/Method`                                 | string             | Filters access by a ProductRestEndpointPage's HTTP Method that is passed in the request                                                                                                                              |
| `apigateway:Request/MtlsTrustStoreUri`                      | string             | Filters access by URI of the truststore used for mutual TLS authentication. Available during the CreateDom ainName and UpdateDomainName operations                                                                   |
| `apigateway:Request/MtlsTrustStoreVersion`                  | string             | Filters access by version of the truststore used for mutual TLS authentication. Available during the CreateDomainName and UpdateDomainName operation s                                                               |
| `apigateway:Request/PortalDisplayName`                      | string             | Filters access by a Portal's Display Name that is passed in the request                                                                                                                                              |
| `apigateway:Request/PortalDomainName`                       | string             | Filters access by a Portal's vanity domain name that is passed in the request                                                                                                                                        |
| `apigateway:Request/PortalProductDisplayName`               | string             | Filters access by a PortalProduct's Display Name that is passed in the request                                                                                                                                       |
| `apigateway:Request/Priority`                               | number             | Filters access by priority of the routing rule. Available during the CreateRoutingRule and UpdateRoutingRule operations                                                                                              |
| `apigateway:Request/ProductPageTitle`                       | string             | Filters access by a ProductPage's Title that is passed in the request                                                                                                                                                |
| `apigateway:Request/ProductRestEndpointPageEndpointPrefix`  | string             | Filters access by a ProductRestEndpointPage's EndpointPrefix that is passed in the request                                                                                                                           |
| `apigateway:Request/RestApiId`                              | string             | Filters access by a ProductRestEndpointPage's Amazon API Gateway API ID that is passed in the request                                                                                                                |
| `apigateway:Request/RouteAuthorizationType`                 | list of strings    | Filters access by authorization type, for example NONE, AWS_IAM, CUSTOM, JWT. Available during the CreateRoute and UpdateRoute operations. Also available as a collection during import                              |
| `apigateway:Request/RoutingMode`                            | string             | Filters access by routing mode of the domain name. Available during the CreateDomainName and UpdateDomainName operations                                                                                             |
| `apigateway:Request/SecurityPolicy`                         | list of strings    | Filters access by TLS version. Available during the CreateDomain and UpdateDomain operations                                                                                                                         |
| `apigateway:Request/Stage`                                  | string             | Filters access by a ProductRestEndpointPage's Amazon API Gateway Stage Name that is passed in the request                                                                                                            |
| `apigateway:Request/StageName`                              | string             | Filters access by stage name of the deployment that you attempt to create. Available during the CreateDep loyment operation                                                                                          |
| `apigateway:Resource/AccessLoggingDestination`              | string             | Filters access by access log destination of the current Stage resource. Available during the UpdateStage and DeleteStage operations                                                                                  |
| `apigateway:Resource/AccessLoggingFormat`                   | string             | Filters access by access log format of the current Stage resource. Available during the UpdateStage and DeleteStage operations                                                                                       |
| `apigateway:Resource/ApiKeyRequired`                        | list of true/false | Filters access by the requirement of API key for the existing Route resource. Available during the UpdateRou te and DeleteRoute operations. Also available as a collection during reimport                           |
| `apigateway:Resource/ApiName`                               | string             | Filters access by API name. Available during the UpdateApi and DeleteApi operations                                                                                                                                  |
| `apigateway:Resource/AuthorizerType`                        | list of strings    | Filters access by the current type of authorizer, for example REQUEST or JWT. Available during UpdateAut horizer and DeleteAuthorizer operations. Also available during import and reimport as an                    |
| `apigateway:Resource/AuthorizerUri`                         | list of strings    | Filters access by the URI of the current Lambda authorizer associated with the current API. Available during UpdateAuthorizer and DeleteAuthorizer. Also available as a collection during reimport                   |
| `apigateway:Resource/CognitoUserPoolArn`                    | ARN                | Filters access by a Portal's CognitoUserPoolArn associate d with the resource                                                                                                                                        |
| `apigateway:Resource/ConditionBasePaths`                    | list of strings    | Filters access by base paths defined on the condition of the existing routing rule. Available during the UpdateRoutingRule and DeleteRoutingRule operations                                                          |
| `apigateway:Resource/DisableExecuteApiEndpoint`             | true / false       | Filters access by status of the default execute-api endpoint. Available during the UpdateApi and DeleteApi operations                                                                                                |
| `apigateway:Resource/EndpointType`                          | list of strings    | Filters access by endpoint type. Available during the UpdateDomainName, DeleteDomainName, UpdateApi, and DeleteApi operations                                                                                        |
| `apigateway:Resource/Method`                                | string             | Filters access by a ProductRestEndpointPage's HTTP Method associated with the resource                                                                                                                               |
| `apigateway:Resource/MtlsTrustStoreUri`                     | string             | Filters access by URI of the truststore used for mutual TLS authentication. Available during the UpdateDom ainName and DeleteDomainName operations                                                                   |
| `apigateway:Resource/MtlsTrustStoreVersion`                 | string             | Filters access by version of the truststore used for mutual TLS authentication. Available during the UpdateDomainName and DeleteDomainName operation s                                                               |
| `apigateway:Resource/PortalDisplayName`                     | string             | Filters access by a Portal's Display Name associated with the resource                                                                                                                                               |
| `apigateway:Resource/PortalDomainName`                      | string             | Filters access by a Portal's vanity domain name associate d with the resource                                                                                                                                        |
| `apigateway:Resource/PortalProductDisplayName`              | string             | Filters access by a PortalProduct's Display Name associated with the resource                                                                                                                                        |
| `apigateway:Resource/PortalPublishStatus`                   | string             | Filters access by a Portal's published status associated with the resource                                                                                                                                           |
| `apigateway:Resource/Priority`                              | number             | Filters access by priority of the existing routing rule. Available during the UpdateRoutingRule and DeleteRou tingRule operations                                                                                    |
| `apigateway:Resource/ProductPageTitle`                      | string             | Filters access by a ProductPage's Title associated with the resource                                                                                                                                                 |
| `apigateway:Resource/ProductRestEndpointPageEndpointPrefix` | string             | —                                                                                                                                                                                                                    |
| `apigateway:Resource/RestApiId`                             | string             | Filters access by a ProductRestEndpointPage's Amazon API Gateway API ID associated with the resource                                                                                                                 |
| `apigateway:Resource/RouteAuthorizationType`                | list of strings    | Filters access by authorization type of the existing Route resource, for example NONE, AWS_IAM, CUSTOM. Available during the UpdateRoute and DeleteRou te operations. Also available as a collection during reimport |
| `apigateway:Resource/RoutingMode`                           | string             | Filters access by routing mode of the existing domain name. Available during the UpdateDomainName and DeleteDomainName operations                                                                                    |
| `apigateway:Resource/SecurityPolicy`                        | list of strings    | Filters access by TLS version. Available during the UpdateDomainName and DeleteDomainName operation s                                                                                                                |
| `apigateway:Resource/Stage`                                 | string             | Filters access by a ProductRestEndpointPage's Amazon API Gateway Stage Name associated with the resource                                                                                                             |

### application-autoscaling

| Key                                          | Value  | Description                                                            |
| -------------------------------------------- | ------ | ---------------------------------------------------------------------- |
| `application-autoscaling:scalable-dimension` | string | Filters access by the scalable dimension that is passed in the request |
| `application-autoscaling:service-namespace`  | string | Filters access by the service namespace that is passed in the request  |

### apprunner

| Key                                       | Value  | Description                                                                                                                          |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `apprunner:AutoScalingConfigurationArn`   | ARN    | —                                                                                                                                    |
| `apprunner:ConnectionArn`                 | ARN    | Filters access by the CreateService and UpdateService actions based on the ARN of an associated Connection resource                  |
| `apprunner:ObservabilityConfigurationArn` | ARN    | Filters access by the CreateService and UpdateService actions based on the ARN of an associated Observabi lityConfiguration resource |
| `apprunner:ServiceArn`                    | ARN    | Filters access by the CreateVpcIngressConnection action based on the ARN of an associated Service resource                           |
| `apprunner:VpcConnectorArn`               | ARN    | Filters access by the CreateService and UpdateService actions based on the ARN of an associated VpcConnec tor resource               |
| `apprunner:VpcEndpointId`                 | string | Filters access by the CreateVpcIngressConnection and UpdateVpcIngressConnection actions based on the VPC Endpoint in the request     |
| `apprunner:VpcId`                         | string | Filters access by the CreateVpcIngressConnection and UpdateVpcIngressConnection actions based on the VPC in the request              |

### appstream

| Key                | Value  | Description                                        |
| ------------------ | ------ | -------------------------------------------------- |
| `appstream:userId` | string | Filters access by the ID of the AppStream 2.0 user |

### appsync

| Key                  | Value  | Description                                |
| -------------------- | ------ | ------------------------------------------ |
| `appsync:Visibility` | string | Filters access by the visibility of an API |

### arc-zonal-shift

| Key                                          | Value  | Description                                                     |
| -------------------------------------------- | ------ | --------------------------------------------------------------- |
| `arc-zonal-shift:ResourceIdentifier`         | string | —                                                               |
| `elasticloadbalancing:ResourceTag/${TagKey}` | string | Filters access by the tags associated with the managed resource |

### artifact

| Key                       | Value  | Description                                                  |
| ------------------------- | ------ | ------------------------------------------------------------ |
| `artifact:ReportCategory` | string | Filters access by which category reports are associated with |
| `artifact:ReportSeries`   | string | Filters access by which series reports are associated with   |

### autoscaling

| Key                                                | Value           | Description                                                                                                                                                                                        |
| -------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoscaling:CapacityReservationIds`               | list of strings | Filters access based on the Capacity Reservation IDs                                                                                                                                               |
| `autoscaling:CapacityReservationResourceGroupArns` | list of strings | Filters access based on the ARN of a Capacity Reservati on resource group                                                                                                                          |
| `autoscaling:ForceDelete`                          | true / false    | Filters access based on whether the force delete option is specified when deleting an Auto Scaling group                                                                                           |
| `autoscaling:ImageId`                              | string          | Filters access based on the AMI ID for the launch configuration                                                                                                                                    |
| `autoscaling:InstanceType`                         | string          | Filters access based on the instance type for the launch configuration                                                                                                                             |
| `autoscaling:InstanceTypes`                        | string          | Filters access based on the instance types present as overrides to a launch template for a mixed instances policy. Use it to qualify which instance types can be explicitly defined in the policy  |
| `autoscaling:LaunchConfigurationName`              | string          | —                                                                                                                                                                                                  |
| `autoscaling:LaunchTemplateVersionSpecified`       | true / false    | —                                                                                                                                                                                                  |
| `autoscaling:LoadBalancerNames`                    | list of strings | Filters access based on the name of the load balancer                                                                                                                                              |
| `autoscaling:MaxSize`                              | number          | Filters access based on the maximum scaling size in the request                                                                                                                                    |
| `autoscaling:MetadataHttpEndpoint`                 | string          | Filters access based on whether the HTTP endpoint is enabled for the instance metadata service                                                                                                     |
| `autoscaling:MetadataHttpPutResponseHopLimit`      | number          | Filters access based on the allowed number of hops when calling the instance metadata service                                                                                                      |
| `autoscaling:MetadataHttpTokens`                   | string          | Filters access based on whether tokens are required when calling the instance metadata service (optional or required)                                                                              |
| `autoscaling:MinSize`                              | number          | Filters access based on the minimum scaling size in the request                                                                                                                                    |
| `autoscaling:OperatorPrincipal`                    | string          | Filters access based on the the operator for EC2 Managed Instances                                                                                                                                 |
| `autoscaling:ResourceTag/${TagKey}`                | string          | Filters access based on the tags associated with the resource                                                                                                                                      |
| `autoscaling:SpotPrice`                            | number          | Filters access based on the price for Spot Instances for the launch configuration                                                                                                                  |
| `autoscaling:TargetCapacityTypes`                  | list of strings | Filters access based on the target capacity types present in the distribution segments of a mixed instances policy. Use it to qualify which capacity types can be explicitly defined in the policy |
| `autoscaling:TargetGroupARNs`                      | list of ARNs    | Filters access based on the ARN of a target group                                                                                                                                                  |
| `autoscaling:TrafficSourceIdentifiers`             | list of strings | —                                                                                                                                                                                                  |
| `autoscaling:VPCZoneIdentifiers`                   | list of strings | —                                                                                                                                                                                                  |

### aws-external-anthropic

| Key                                       | Value        | Description                                                             |
| ----------------------------------------- | ------------ | ----------------------------------------------------------------------- |
| `aws-external-anthropic:BearerTokenType`  | string       | Filters access by the Short-term or Long-term bearer tokens             |
| `aws-external-anthropic:CalledViaConsole` | true / false | Filters access by the use of the Claude Platform console                |
| `aws-external-anthropic:Capability`       | string       | Filters access by the Claude Platform role used for the console session |

### aws-marketplace

| Key                                | Value           | Description                                                           |
| ---------------------------------- | --------------- | --------------------------------------------------------------------- |
| `aws-marketplace:AgreementType`    | list of strings | Filters access by the type of the agreement                           |
| `aws-marketplace:Intent`           | string          | Filters access by the Intent parameter in the StartChan geSet request |
| `aws-marketplace:PartyType`        | string          | Filters access by the party type of the agreement                     |
| `aws-marketplace:ProductId`        | list of strings | Filters access by product id for AWS Marketplace purchases            |
| `aws-marketplace:VerificationType` | string          | —                                                                     |
| `catalog:ChangeType`               | string          | Filters access by the change type in the StartChangeSet request       |

### backup

| Key                         | Value           | Description                                                    |
| --------------------------- | --------------- | -------------------------------------------------------------- |
| `backup:ChangeableForDays`  | number          | Filters access by the value of the ChangeableForDays parameter |
| `backup:CopyTargetOrgPaths` | list of strings | Filters access by the organization unit                        |
| `backup:CopyTargets`        | list of ARNs    | Filters access by the ARN of a backup vault                    |
| `backup:FrameworkArns`      | list of ARNs    | Filters access by the Framework ARNs                           |
| `backup:Index`              | string          | Filters access by the value of Index parameter                 |
| `backup:MaxRetentionDays`   | number          | Filters access by the value of the MaxRetentionDays parameter  |
| `backup:MinRetentionDays`   | number          | Filters access by the value of the MinRetentionDays parameter  |
| `backup:MpaApprovalTeamArn` | ARN             | Filters access by the MPA Approval Team ARN of a backup vault  |

### batch

| Key                           | Value        | Description                                                                                                                                                                                                   |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `batch:AWSLogsCreateGroup`    | true / false | Filters access by the specified logging driver to determine whether awslogs group will be created for the logs                                                                                                |
| `batch:AWSLogsGroup`          | string       | Filters access by the awslogs group where the logs are located                                                                                                                                                |
| `batch:AWSLogsRegion`         | string       | Filters access by the region where the logs are sent to                                                                                                                                                       |
| `batch:AWSLogsStreamPrefix`   | string       | —                                                                                                                                                                                                             |
| `batch:EKSImage`              | string       | Filters access by the image used to start a container for an Amazon EKS job                                                                                                                                   |
| `batch:EKSNamespace`          | string       | Filters access by the namespace of a cluster used to run the pod for an Amazon EKS job                                                                                                                        |
| `batch:EKSPrivileged`         | true / false | Filters access by the specified privileged parameter value that determines whether the container is given elevated privileges on the host container instance (similar to the root user) for an Amazon EKS job |
| `batch:EKSRunAsGroup`         | number       | Filters access by the specified group numeric ID (gid) used to start a container in an Amazon EKS job                                                                                                         |
| `batch:EKSRunAsUser`          | number       | Filters access by the specified user numeric ID (uid) used to start a a container in an Amazon EKS job                                                                                                        |
| `batch:EKSServiceAccountName` | string       | Filters access by the name of the service account used to run the pod for an Amazon EKS job                                                                                                                   |
| `batch:Image`                 | string       | Filters access by the image used to start a container                                                                                                                                                         |
| `batch:LogDriver`             | string       | Filters access by the log driver used for the container                                                                                                                                                       |
| `batch:Privileged`            | true / false | Filters access by the specified privileged parameter value that determines whether the container is given elevated privileges on the host container instance (similar to the root user)                       |
| `batch:SchedulingPriority`    | number       | Filters access by the scheduling priority for jobs in the job queue                                                                                                                                           |
| `batch:ShareIdentifier`       | string       | Filters access by the shareIdentifier used inside submit job                                                                                                                                                  |
| `batch:User`                  | string       | Filters access by user name or numeric uid used inside the container                                                                                                                                          |

### bedrock

| Key                                                   | Value  | Description                                                                                                                            |
| ----------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `bedrock:BearerTokenType`                             | string | Filters access by the Short-term or Long-term bearer tokens                                                                            |
| `bedrock:DataRetentionMode`                           | string | Filters access by the specified Data Retention Mode                                                                                    |
| `bedrock:GuardrailIdentifier`                         | ARN    | —                                                                                                                                      |
| `bedrock:InferenceProfileArn`                         | ARN    | —                                                                                                                                      |
| `bedrock:InlineAgentName`                             | string | Filters access by the Inline Agent Names, this will be used in InvokeInlineAgent API names                                             |
| `bedrock:ModelArn`                                    | ARN    | Filters access by the model that a stateful invocation runs, on the authorization whose resource is the project                        |
| `bedrock:ProjectArn`                                  | ARN    | Filters access by the project that a stateful invocatio n belongs to, on authorizations whose resource is the inference target it runs |
| `bedrock:PromptRouterArn`                             | ARN    | Filters access by the specified prompt router                                                                                          |
| `bedrock:ServiceTier`                                 | string | Filters access by the specified ServiceTier                                                                                            |
| `bedrock:ThirdPartyKnowledgeBaseCredentialsSecretArn` | ARN    | Filters access by the secretArn containing the credentials of the third party platform                                                 |

### bedrock-agentcore

| Key                                                  | Value           | Description                                                                                                  |
| ---------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| `bedrock-agentcore:AllowedQueryParameters`           | list of strings | Filters access by the metadataConfiguration.allow edQueryParameters attribute of a gateway target            |
| `bedrock-agentcore:AllowedRequestHeaders`            | list of strings | Filters access by the metadataConfiguration.allow edRequestHeaders attribute of a gateway target             |
| `bedrock-agentcore:AllowedResponseHeaders`           | list of strings | Filters access by the metadataConfiguration.allow edResponseHeaders attribute of a gateway target            |
| `bedrock-agentcore:CredentialProviderScope`          | list of strings | Filters access by the scopes attribute of an OAuth credential provider on a gateway target                   |
| `bedrock-agentcore:CredentialProviderType`           | string          | Filters access by the credentialProviderConfigura tions.credentialProviderType attribute of a gateway target |
| `bedrock-agentcore:DiscoveryUrl`                     | string          | Filters access by the authorizerConfiguration.cus tomJWTAuthorizer.discoveryUrl attribute of a Gateway       |
| `bedrock-agentcore:GatewayAuthorizerType`            | string          | Filters access by the authorizerType attribute on a Gateway                                                  |
| `bedrock-agentcore:HttpTargetConfigurationType`      | string          | —                                                                                                            |
| `bedrock-agentcore:InboundJwtClaim/aud`              | list of strings | Filters access by the audience claim (aud) in the JWT passed in the request                                  |
| `bedrock-agentcore:InboundJwtClaim/client_id`        | string          | Filters access by the client_id claim in the JWT passed in the request                                       |
| `bedrock-agentcore:InboundJwtClaim/iss`              | string          | Filters access by the issuer (iss) claim present in the JWT passed in the request                            |
| `bedrock-agentcore:InboundJwtClaim/scope`            | list of strings | Filters access by the scope claim in the JWT passed in the request                                           |
| `bedrock-agentcore:InboundJwtClaim/sub`              | string          | Filters access by the subject claim (sub) in the JWT passed in the request                                   |
| `bedrock-agentcore:InferenceTargetConfigurationType` | string          | —                                                                                                            |
| `bedrock-agentcore:KmsKeyArn`                        | string          | Filters access by KMS Key arn provided                                                                       |
| `bedrock-agentcore:McpTargetConfigurationType`       | string          | —                                                                                                            |
| `bedrock-agentcore:PolicyEngineArn`                  | string          | Filters access by the policyEngineConfiguration.arn attribute of a Gateway                                   |
| `bedrock-agentcore:PolicyEngineMode`                 | string          | Filters access by the policyEngineConfiguration.mode attribute of a Gateway                                  |
| `bedrock-agentcore:PrivateEndpointType`              | string          | Filters access by the private endpoint type of a gateway target                                              |
| `bedrock-agentcore:ProtocolType`                     | string          | Filters access by the protocolType attribute of a Gateway                                                    |
| `bedrock-agentcore:ResourceConfigurationIdentifier`  | string          | —                                                                                                            |
| `bedrock-agentcore:RuntimeAuthorizerType`            | string          | Filters access by the authorizer type configured for the AgentCore runtime                                   |
| `bedrock-agentcore:actorId`                          | string          | Filters access by Actor Id                                                                                   |
| `bedrock-agentcore:namespace`                        | string          | Filters access by namespace                                                                                  |
| `bedrock-agentcore:runtimeSessionId`                 | string          | Filters access by Runtime Session Id                                                                         |
| `bedrock-agentcore:securityGroups`                   | list of strings | Filters access by the ID of security groups configured for an AgentCore resource                             |
| `bedrock-agentcore:sessionId`                        | string          | Filters access by Memory Session Id                                                                          |
| `bedrock-agentcore:strategyId`                       | string          | Filters access by Memory Strategy Id                                                                         |
| `bedrock-agentcore:subnets`                          | list of strings | Filters access by the ID of subnets configured for an AgentCore resource                                     |
| `bedrock-agentcore:userid`                           | string          | Filters access by the static user ID value passed in the request                                             |

### bedrock-mantle

| Key                                 | Value           | Description                                                                                                   |
| ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| `bedrock-mantle:BearerTokenType`    | string          | Filters access by the Short-term or Long-term bearer tokens                                                   |
| `bedrock-mantle:CustomizedModelArn` | string          | Filters access by the ARN of the customized model being associated or referenced in cross-resource operations |
| `bedrock-mantle:DataRetentionMode`  | string          | Filters access by the data retention mode being set on a project or account                                   |
| `bedrock-mantle:Files`              | list of strings | Filters access by the specified file identifiers                                                              |
| `bedrock-mantle:FineTuningJob`      | string          | Filters access by the specified fine-tuning job identifier                                                    |
| `bedrock-mantle:Model`              | string          | Filters access by the specified Model                                                                         |
| `bedrock-mantle:ProjectArn`         | string          | Filters access by the ARN of the project being associated or referenced in cross-resource operations          |
| `bedrock-mantle:ReservationArn`     | string          | Filters access by the ARN of the reservation being referenced in cross-resource operations                    |
| `bedrock-mantle:ServiceTier`        | string          | Filters access by the specified ServiceTier                                                                   |

### cases

| Key                     | Value  | Description                                                                                                   |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| `cases:CreatedBy`       | string | Filters access by who created the the resource (user ARN or custom entity)                                    |
| `cases:RelatedItemType` | string | Filters access by the type of related item. Possible values: Contact, Comment, File, Sla, ConnectCase, Custom |
| `connect:UserArn`       | ARN    | Filters access by connect's UserArn                                                                           |

### cleanrooms-ml

| Key                             | Value  | Description                                    |
| ------------------------------- | ------ | ---------------------------------------------- |
| `cleanrooms-ml:CollaborationId` | string | Filters access by Clean rooms collaboration id |

### cloud9

| Key                      | Value  | Description                                                                             |
| ------------------------ | ------ | --------------------------------------------------------------------------------------- |
| `cloud9:EnvironmentId`   | string | Filters access by the AWS Cloud9 environment ID                                         |
| `cloud9:EnvironmentName` | string | Filters access by the AWS Cloud9 environment name                                       |
| `cloud9:InstanceType`    | string | Filters access by the instance type of the AWS Cloud9 environment's Amazon EC2 instance |
| `cloud9:OwnerArn`        | ARN    | Filters access by the owner ARN specified                                               |
| `cloud9:Permissions`     | string | Filters access by the type of AWS Cloud9 permissions                                    |
| `cloud9:SubnetId`        | string | Filters access by the subnet ID that the AWS Cloud9 environment will be created in      |
| `cloud9:UserArn`         | ARN    | Filters access by the user ARN specified                                                |

### cloudformation

| Key                                  | Value           | Description                                                                                                                                                                             |
| ------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cloudformation:ChangeSetName`       | string          | Filters access by an AWS CloudFormation change set name. Use to control which change sets IAM users can execute or delete                                                               |
| `cloudformation:CreateAction`        | string          | Filters access by the name of a resource-mutating API action. Use to control which APIs IAM users can use to add or remove tags on a stack or stack set                                 |
| `cloudformation:ImportResourceTypes` | string          | Filters access by the template resource types, such as AWS::EC2::Instance. Use to control which resource types IAM users can work with when they want to import a resource into a stack |
| `cloudformation:ResourceTypes`       | list of strings | Filters access by the template resource types, such as AWS::EC2::Instance. Use to control which resource types IAM users can work with when they create or update a stack               |
| `cloudformation:RoleArn`             | ARN             | Filters access by the ARN of an IAM service role. Use to control which service role IAM users can use to work with stacks or change sets                                                |
| `cloudformation:StackPolicyUrl`      | string          | Filters access by an Amazon S3 stack policy URL. Use to control which stack policies IAM users can associate with a stack during a create or update stack action                        |
| `cloudformation:TargetRegion`        | list of strings | Filters access by stack set target region. Use to control which regions IAM users can use when they create or update stack sets                                                         |
| `cloudformation:TemplateUrl`         | string          | Filters access by an Amazon S3 template URL. Use to control which templates IAM users can use when they create or update stacks                                                         |
| `cloudformation:TypeArn`             | ARN             | Filters access by the ARN of a CloudFormation extension                                                                                                                                 |

### cloudshell

| Key                           | Value           | Description                                                                        |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------------- |
| `cloudshell:SecurityGroupIds` | list of strings | Filters access by security group ids. Available during CreateEnvironment operation |
| `cloudshell:SubnetIds`        | list of strings | Filters access by subnet ids. Available during CreateEnv ironment operation        |
| `cloudshell:VpcIds`           | list of strings | Filters access by vpc ids. Available during CreateEnv ironment operation           |

### cloudwatch

| Key                                      | Value           | Description                                                             |
| ---------------------------------------- | --------------- | ----------------------------------------------------------------------- |
| `cloudwatch:AlarmActions`                | list of strings | Filters access by defined alarm actions                                 |
| `cloudwatch:namespace`                   | string          | Filters access by the presence of optional namespace values             |
| `cloudwatch:requestInsightRuleLogGroups` | list of strings | Filters access by the Log Groups specified in an Insight Rule           |
| `cloudwatch:requestManagedResourceARNs`  | list of ARNs    | Filters access by the Resource ARNs specified in a managed Insight Rule |

### codebuild

| Key                                                                          | Value              | Description                                                                              |
| ---------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `codebuild:artifacts`                                                        | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:artifacts.bucketOwnerAccess`                                      | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:artifacts.encryptionDisabled`                                     | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:artifacts.location`                                               | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:authType`                                                         | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:autoRetryLimit`                                                   | number             | Filters access by the API corresponding argument value                                   |
| `codebuild:buildArn`                                                         | ARN                | Filters access by the ARN of the AWS CodeBuild build from which the request originated   |
| `codebuild:buildBatchConfig`                                                 | true / false       | —                                                                                        |
| `codebuild:buildBatchConfig.restrictions.computeTypesAllowed`                | list of strings    | —                                                                                        |
| `codebuild:buildBatchConfig.restrictions.fleetsAllowed`                      | list of strings    | —                                                                                        |
| `codebuild:buildBatchConfig.serviceRole`                                     | string             | —                                                                                        |
| `codebuild:buildType`                                                        | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:cache`                                                            | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:cache.location`                                                   | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:cache.modes`                                                      | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:cache.type`                                                       | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:computeConfiguration`                                             | true / false       | —                                                                                        |
| `codebuild:computeConfiguration.disk`                                        | number             | —                                                                                        |
| `codebuild:computeConfiguration.instanceType`                                | string             | —                                                                                        |
| `codebuild:computeConfiguration.machineType`                                 | string             | —                                                                                        |
| `codebuild:computeConfiguration.memory`                                      | number             | —                                                                                        |
| `codebuild:computeConfiguration.vCpu`                                        | number             | —                                                                                        |
| `codebuild:computeType`                                                      | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:concurrentBuildLimit`                                             | number             | Filters access by the API corresponding argument value                                   |
| `codebuild:encryptionKey`                                                    | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environment`                                                      | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.certificate`                                          | string             | —                                                                                        |
| `codebuild:environment.computeConfiguration`                                 | true / false       | —                                                                                        |
| `codebuild:environment.computeConfiguration.disk`                            | number             | —                                                                                        |
| `codebuild:environment.computeConfiguration.instanceType`                    | string             | —                                                                                        |
| `codebuild:environment.computeConfiguration.machineType`                     | string             | —                                                                                        |
| `codebuild:environment.computeConfiguration.memory`                          | number             | —                                                                                        |
| `codebuild:environment.computeConfiguration.vCpu`                            | number             | —                                                                                        |
| `codebuild:environment.computeType`                                          | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.environmentVariables`                                 | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.environmentVariables.name`                            | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.environmentVariables.value`                           | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.environmentVariables/${name}.value`                   | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.fleet.fleetArn`                                       | ARN                | —                                                                                        |
| `codebuild:environment.image`                                                | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.imagePullCredentialsType`                             | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.privilegedMode`                                       | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.registryCredential`                                   | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.registryCredential.credential`                        | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.registryCredential.credentialProvider`                | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environment.type`                                                 | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:environmentType`                                                  | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:exportConfig.s3Destination.bucket`                                | string             | —                                                                                        |
| `codebuild:exportConfig.s3Destination.bucketOwner`                           | string             | —                                                                                        |
| `codebuild:exportConfig.s3Destination.encryptionDisabled`                    | true / false       | —                                                                                        |
| `codebuild:exportConfig.s3Destination.encryptionKey`                         | string             | —                                                                                        |
| `codebuild:exportConfig.s3Destination.path`                                  | string             | —                                                                                        |
| `codebuild:fileSystemLocations.identifier`                                   | list of strings    | —                                                                                        |
| `codebuild:fileSystemLocations.location`                                     | list of strings    | —                                                                                        |
| `codebuild:fileSystemLocations.type`                                         | list of strings    | —                                                                                        |
| `codebuild:fileSystemLocations/${identifier}.location`                       | string             | —                                                                                        |
| `codebuild:fileSystemLocations/${identifier}.type`                           | string             | —                                                                                        |
| `codebuild:fleetServiceRole`                                                 | string             | —                                                                                        |
| `codebuild:imageId`                                                          | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:logsConfig`                                                       | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:logsConfig.s3Logs`                                                | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:logsConfig.s3Logs.bucketOwnerAccess`                              | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:logsConfig.s3Logs.encryptionDisabled`                             | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:logsConfig.s3Logs.location`                                       | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:logsConfig.s3Logs.status`                                         | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:manualCreation`                                                   | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:projectArn`                                                       | ARN                | Filters access by the ARN of the AWS CodeBuild project from which the request originated |
| `codebuild:projectVisibility`                                                | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:scopeConfiguration.domain`                                        | string             | —                                                                                        |
| `codebuild:scopeConfiguration.name`                                          | string             | —                                                                                        |
| `codebuild:scopeConfiguration.scope`                                         | string             | —                                                                                        |
| `codebuild:secondaryArtifacts`                                               | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:secondaryArtifacts.artifactIdentifier`                            | list of strings    | —                                                                                        |
| `codebuild:secondaryArtifacts.bucketOwnerAccess`                             | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:secondaryArtifacts.encryptionDisabled`                            | list of true/false | Filters access by the API corresponding argument value                                   |
| `codebuild:secondaryArtifacts.location`                                      | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:secondaryArtifacts/${artifactIdentifier}.bucketOwnerAccess`       | string             | —                                                                                        |
| `codebuild:secondaryArtifacts/${artifactIdentifier}.encryptionDisabled`      | true / false       | —                                                                                        |
| `codebuild:secondaryArtifacts/${artifactIdentifier}.location`                | string             | —                                                                                        |
| `codebuild:secondarySources`                                                 | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:secondarySources.auth.resource`                                   | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:secondarySources.auth.type`                                       | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:secondarySources.buildStatusConfig.context`                       | list of strings    | —                                                                                        |
| `codebuild:secondarySources.buildStatusConfig.targetUrl`                     | list of strings    | —                                                                                        |
| `codebuild:secondarySources.buildspec`                                       | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:secondarySources.insecureSsl`                                     | list of true/false | Filters access by the API corresponding argument value                                   |
| `codebuild:secondarySources.location`                                        | list of strings    | Filters access by the API corresponding argument value                                   |
| `codebuild:secondarySources.sourceIdentifier`                                | list of strings    | —                                                                                        |
| `codebuild:secondarySources/${sourceIdentifier}.auth.resource`               | string             | —                                                                                        |
| `codebuild:secondarySources/${sourceIdentifier}.auth.type`                   | string             | —                                                                                        |
| `codebuild:secondarySources/${sourceIdentifier}.buildStatusConfig.context`   | string             | —                                                                                        |
| `codebuild:secondarySources/${sourceIdentifier}.buildStatusConfig.targetUrl` | string             | —                                                                                        |
| `codebuild:secondarySources/${sourceIdentifier}.buildspec`                   | true / false       | —                                                                                        |
| `codebuild:secondarySources/${sourceIdentifier}.insecureSsl`                 | true / false       | —                                                                                        |
| `codebuild:secondarySources/${sourceIdentifier}.location`                    | string             | —                                                                                        |
| `codebuild:serverType`                                                       | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:serviceRole`                                                      | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:shouldOverwrite`                                                  | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:source`                                                           | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:source.auth.resource`                                             | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:source.auth.type`                                                 | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:source.buildStatusConfig.context`                                 | string             | —                                                                                        |
| `codebuild:source.buildStatusConfig.targetUrl`                               | string             | —                                                                                        |
| `codebuild:source.buildspec`                                                 | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:source.insecureSsl`                                               | true / false       | Filters access by the API corresponding argument value                                   |
| `codebuild:source.location`                                                  | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:token`                                                            | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:username`                                                         | string             | Filters access by the API corresponding argument value                                   |
| `codebuild:vpcConfig`                                                        | true / false       | —                                                                                        |
| `codebuild:vpcConfig.securityGroupIds`                                       | list of strings    | —                                                                                        |
| `codebuild:vpcConfig.subnets`                                                | list of strings    | —                                                                                        |
| `codebuild:vpcConfig.vpcId`                                                  | string             | —                                                                                        |

### codecommit

| Key                     | Value  | Description                                                         |
| ----------------------- | ------ | ------------------------------------------------------------------- |
| `codecommit:References` | string | Filters access by Git reference to specified AWS CodeCommit actions |

### codeconnections

| Key                                           | Value  | Description                                                                                                                                                                                                                             |
| --------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `codeconnections:Branch`                      | string | Filters access by the branch name that is passed in the request                                                                                                                                                                         |
| `codeconnections:BranchName`                  | string | Filters access by the branch name that is passed in the request. Applies only to UseConnection requests for access to a specific repository branch                                                                                      |
| `codeconnections:FullRepositoryId`            | string | Filters access by the repository that is passed in the request. Applies only to UseConnection requests for access to a specific repository                                                                                              |
| `codeconnections:HostArn`                     | ARN    | Filters access by the host resource associated with the connection used in the request                                                                                                                                                  |
| `codeconnections:InstallationId`              | string | Filters access by the third-party ID (such as the Bitbucket App installation ID for CodeConnections) that is used to update a Connection. Allows you to restrict which third- party App installations can be used to make a Connectio n |
| `codeconnections:OwnerId`                     | string | Filters access by the owner of the third-party repositor y. Applies only to UseConnection requests for access to repositories owned by a specific user                                                                                  |
| `codeconnections:PassedToService`             | string | Filters access by the service to which the principal is allowed to pass a Connection or RepositoryLink                                                                                                                                  |
| `codeconnections:ProviderAction`              | string | Filters access by the provider action in a UseConnection request such as ListRepositories. See documentation for all valid values                                                                                                       |
| `codeconnections:ProviderPermissionsRequired` | string | Filters access by the write permissions of a provider action in a UseConnection request. Valid types include read_only and read_write                                                                                                   |
| `codeconnections:ProviderType`                | string | Filters access by the type of third-party provider passed in the request                                                                                                                                                                |
| `codeconnections:ProviderTypeFilter`          | string | Filters access by the type of third-party provider used to filter results                                                                                                                                                               |
| `codeconnections:RepositoryName`              | string | Filters access by the repository name that is passed in the request. Applies only to UseConnection requests for access to repositories owned by a specific user                                                                         |
| `codeconnections:VpcId`                       | string | Filters access by the VpcId passed in the request                                                                                                                                                                                       |

### codestar

| Key                         | Value  | Description                                                                    |
| --------------------------- | ------ | ------------------------------------------------------------------------------ |
| `iam:ResourceTag/${TagKey}` | string | Filters access by the tags that are attached to the role that is being assumed |

### codestar-connections

| Key                                                | Value  | Description                                                                                                                                                                                                                                |
| -------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `codestar-connections:Branch`                      | string | Filters access by the branch name that is passed in the request                                                                                                                                                                            |
| `codestar-connections:BranchName`                  | string | Filters access by the branch name that is passed in the request. Applies only to UseConnection requests for access to a specific repository branch                                                                                         |
| `codestar-connections:FullRepositoryId`            | string | Filters access by the repository that is passed in the request. Applies only to UseConnection requests for access to a specific repository                                                                                                 |
| `codestar-connections:HostArn`                     | ARN    | Filters access by the host resource associated with the connection used in the request                                                                                                                                                     |
| `codestar-connections:InstallationId`              | string | Filters access by the third-party ID (such as the Bitbucket App installation ID for CodeStar Connections) that is used to update a Connection. Allows you to restrict which third-party App installations can be used to make a Connection |
| `codestar-connections:OwnerId`                     | string | Filters access by the owner of the third-party repositor y. Applies only to UseConnection requests for access to repositories owned by a specific user                                                                                     |
| `codestar-connections:PassedToService`             | string | Filters access by the service to which the principal is allowed to pass a Connection or RepositoryLink                                                                                                                                     |
| `codestar-connections:ProviderAction`              | string | Filters access by the provider action in a UseConnection request such as ListRepositories. See documentation for all valid values                                                                                                          |
| `codestar-connections:ProviderPermissionsRequired` | string | Filters access by the write permissions of a provider action in a UseConnection request. Valid types include read_only and read_write                                                                                                      |
| `codestar-connections:ProviderType`                | string | Filters access by the type of third-party provider passed in the request                                                                                                                                                                   |
| `codestar-connections:ProviderTypeFilter`          | string | Filters access by the type of third-party provider used to filter results                                                                                                                                                                  |
| `codestar-connections:RepositoryName`              | string | Filters access by the repository name that is passed in the request. Applies only to UseConnection requests for access to repositories owned by a specific user                                                                            |
| `codestar-connections:VpcId`                       | string | Filters access by the VpcId passed in the request                                                                                                                                                                                          |

### codestar-notifications

| Key                                               | Value | Description |
| ------------------------------------------------- | ----- | ----------- |
| `codestar-notifications:NotificationsForResource` | ARN   | —           |

### cognito-identity

| Key                                       | Value  | Description                                                                                                                                       |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cognito-identity-auth:AccountId`         | string | Filters access by the owning AWS account ID for identity pool authenticated users. Applies to unauthenticated (public) API operations             |
| `cognito-identity-auth:IdentityPoolArn`   | ARN    | Filters access by the identity pool ID for a given authenticated-user identity ID. Applies to unauthent icated (public) API operations            |
| `cognito-identity-unauth:AccountId`       | string | Filters access by the owning AWS account ID of an identity pool for identity pool guest users. Applies to unauthenticated (public) API operations |
| `cognito-identity-unauth:IdentityPoolArn` | ARN    | Filters access by the identity pool ID for a given guest- user identity ID. Applies to unauthenticated (public) API operations                    |
| `cognito-identity:IdentityPoolArn`        | ARN    | Filters access by the identity pool ID for a given identity ID for DeleteIdentities and DescribeIdentity                                          |

### comprehend

| Key                              | Value           | Description                                                                                          |
| -------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------- |
| `comprehend:DataLakeKmsKey`      | ARN             | Filters access by the DataLake Kms Key associated with the flywheel resource in the request          |
| `comprehend:FlywheelIterationId` | string          | Filters access by particular Iteration Id for a flywheel                                             |
| `comprehend:ModelKmsKey`         | ARN             | Filters access by the model KMS key associated with the resource in the request                      |
| `comprehend:OutputKmsKey`        | ARN             | Filters access by the output KMS key associated with the resource in the request                     |
| `comprehend:VolumeKmsKey`        | ARN             | Filters access by the volume KMS key associated with the resource in the request                     |
| `comprehend:VpcSecurityGroupIds` | list of strings | Filters access by the list of all VPC security group ids associated with the resource in the request |
| `comprehend:VpcSubnets`          | list of strings | Filters access by the list of all VPC subnets associated with the resource in the request            |

### compute-optimizer

| Key                              | Value  | Description                         |
| -------------------------------- | ------ | ----------------------------------- |
| `compute-optimizer:ResourceType` | string | Filters access by the resource type |

### config

| Key                                            | Value  | Description |
| ---------------------------------------------- | ------ | ----------- |
| `config:ConfigurationRecorderServicePrincipal` | string | —           |

### connect

| Key                                                        | Value           | Description                                                                                                                    |
| ---------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `connect:AssignmentType`                                   | string          | Filters access by restricting access to create contacts based on Assignment Type                                               |
| `connect:AttributeType`                                    | string          | Filters access by the attribute type of the Amazon Connect instance                                                            |
| `connect:Channel`                                          | string          | Filters access by Channel                                                                                                      |
| `connect:ContactAssociationId`                             | string          | Filters access by ContactAssociationId                                                                                         |
| `connect:ContactInitiationMethod`                          | string          | Filters access by restricting access to create contacts based on the initiation method of the contact                          |
| `connect:ExpressionValue`                                  | string          | Filters access by restricting data table operations based on expression type                                                   |
| `connect:FlowType`                                         | list of strings | Filters access by Flow type                                                                                                    |
| `connect:InstanceId`                                       | string          | Filters access by restricting federation into specified Amazon Connect instances                                               |
| `connect:ListRealtimeContactAnalysisSegmentsByOutputType`  | string          | Filters access by restricting the listed segments using the output type of the Amazon Connect Contact Lens real- time segment  |
| `connect:ListRealtimeContactAnalysisSegmentsBySegmentType` | list of strings | Filters access by restricting the listed segments using the segment types of the Amazon Connect Contact Lens real-time segment |
| `connect:MonitorCapabilities`                              | list of strings | Filters access by restricting the monitor capabilities of the user in the request                                              |
| `connect:PreferredUserArn`                                 | ARN             | Filters access by PreferredUserArn                                                                                             |
| `connect:PrimaryAttribute/${PrimaryAttribute}`             | string          | Filters access by restricting which primary attributes the user can manage                                                     |
| `connect:SearchContactsByContactAnalysis`                  | list of strings | Filters access by restricting searches using analysis outputs from Amazon Connect Contact Lens                                 |
| `connect:SearchTag/${TagKey}`                              | string          | Filters access by TagFilter condition passed in the search request                                                             |
| `connect:StorageResourceType`                              | string          | Filters access by restricting the storage resource type of the Amazon Connect instance storage configuration                   |
| `connect:Subtype`                                          | string          | Filters access by restricting creation of a contact for specific subtypes                                                      |
| `connect:UserArn`                                          | ARN             | Filters access by connect's UserArn                                                                                            |

### dataexchange

| Key                    | Value  | Description                              |
| ---------------------- | ------ | ---------------------------------------- |
| `dataexchange:JobType` | string | Filters access by the specified job type |

### datapipeline

| Key                            | Value           | Description                                                                            |
| ------------------------------ | --------------- | -------------------------------------------------------------------------------------- |
| `datapipeline:PipelineCreator` | list of strings | Filters access by the IAM user that created the pipeline                               |
| `datapipeline:Tag/${TagKey}`   | string          | Filters access by customer-specified key/value pair that can be attached to a resource |
| `datapipeline:workerGroup`     | list of strings | Filters access by the name of a worker group for which a Task Runner retrieves work    |

### datazone

| Key                  | Value  | Description                                            |
| -------------------- | ------ | ------------------------------------------------------ |
| `datazone:domainId`  | string | Filters access by the domain ID passed in the request  |
| `datazone:projectId` | string | Filters access by the project ID passed in the request |
| `datazone:userId`    | string | Filters access by the user ID passed in the request    |

### dax

| Key                      | Value  | Description                                                                                    |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------------- |
| `dax:EnclosingOperation` | string | Used to block Transactions APIs calls and allow the non- Transaction APIs calls and vice-versa |

### deadline

| Key                                  | Value           | Description                                                                                |
| ------------------------------------ | --------------- | ------------------------------------------------------------------------------------------ |
| `deadline:AssociatedMembershipLevel` | string          | Filters access by the associated membership level of the principal provided in the request |
| `deadline:CalledAction`              | string          | Filters access by the allowed action in the request                                        |
| `deadline:FarmMembershipLevels`      | list of strings | Filters access by membership levels on the farm                                            |
| `deadline:FleetMembershipLevels`     | list of strings | Filters access by membership levels on the fleet                                           |
| `deadline:JobMembershipLevels`       | list of strings | Filters access by membership levels on the job                                             |
| `deadline:MembershipLevel`           | string          | Filters access by the membership level passed in the request                               |
| `deadline:PrincipalId`               | string          | Filters access by the principle ID provided in the request                                 |
| `deadline:QueueMembershipLevels`     | list of strings | Filters access by membership levels on the queue                                           |
| `deadline:RequesterPrincipalId`      | string          | Filters access by the user calling the Deadline Cloud API                                  |

### devops-guru

| Key                        | Value           | Description                                                         |
| -------------------------- | --------------- | ------------------------------------------------------------------- |
| `devops-guru:ServiceNames` | list of strings | Filters access by API to restrict access to given AWS service names |

### dms

| Key                                       | Value  | Description                                                                                     |
| ----------------------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `dms:assessment-run-tag/${TagKey}`        | string | Filters access by the presence of tag key-value pairs in the request for AssessmentRun          |
| `dms:cert-tag/${TagKey}`                  | string | Filters access by the presence of tag key-value pairs in the request for Certificate            |
| `dms:data-migration-tag/${TagKey}`        | string | Filters access by the presence of tag key-value pairs in the request for DataMigration          |
| `dms:data-provider-tag/${TagKey}`         | string | Filters access by the presence of tag key-value pairs in the request for DataProvider           |
| `dms:endpoint-tag/${TagKey}`              | string | Filters access by the presence of tag key-value pairs in the request for Endpoint               |
| `dms:es-tag/${TagKey}`                    | string | Filters access by the presence of tag key-value pairs in the request for EventSubscription      |
| `dms:individual-assessment-tag/${TagKey}` | string | Filters access by the presence of tag key-value pairs in the request for IndividualAssessment   |
| `dms:instance-profile-tag/${TagKey}`      | string | —                                                                                               |
| `dms:migration-project-tag/${TagKey}`     | string | Filters access by the presence of tag key-value pairs in the request for MigrationProject       |
| `dms:rep-tag/${TagKey}`                   | string | Filters access by the presence of tag key-value pairs in the request for ReplicationInstance    |
| `dms:replication-config-tag/${TagKey}`    | string | —                                                                                               |
| `dms:req-tag/${TagKey}`                   | string | Filters access by the presence of tag key-value pairs in the given request                      |
| `dms:subgrp-tag/${TagKey}`                | string | Filters access by the presence of tag key-value pairs in the request for ReplicationSubnetGroup |
| `dms:task-tag/${TagKey}`                  | string | Filters access by the presence of tag key-value pairs in the request for ReplicationTask        |

### drs

| Key                  | Value  | Description                                                    |
| -------------------- | ------ | -------------------------------------------------------------- |
| `drs:CreateAction`   | string | Filters access by the name of a resource-creating API action   |
| `drs:EC2InstanceARN` | ARN    | Filters access by the EC2 instance the request originated from |

### ds-data

| Key                      | Value  | Description                                                                                          |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------------------- |
| `ds-data:Identifier`     | string | —                                                                                                    |
| `ds-data:MemberName`     | string | Filters access by the directory SAM Account Name included in the MemberName input of the request     |
| `ds-data:MemberRealm`    | string | Filters access by the directory realm name included in the MemberRealm input of the request          |
| `ds-data:Realm`          | string | Filters access by the directory realm name for the request                                           |
| `ds-data:SAMAccountName` | string | Filters access by the directory SAM Account Name included in the SAMAccountName input of the request |

### dsql

| Key                  | Value        | Description                                                   |
| -------------------- | ------------ | ------------------------------------------------------------- |
| `dsql:FisActionId`   | string       | Filters access by the ID of an AWS FIS action                 |
| `dsql:FisTargetArns` | list of ARNs | Filters access by the ARN of an AWS FIS target                |
| `dsql:WitnessRegion` | string       | Filters access by the witness region of multi-Region clusters |

### dynamodb

| Key                                 | Value           | Description                                                                                                                                          |
| ----------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dynamodb:Attributes`               | list of strings | Filters access by attribute (field or column) names of the table                                                                                     |
| `dynamodb:EnclosingOperation`       | string          | Filters access by blocking Transactions APIs calls and allow the non-Transaction APIs calls and vice-versa                                           |
| `dynamodb:FirstPartitionKeyValues`  | list of strings | Filters access by the first partition key of the table                                                                                               |
| `dynamodb:FisActionId`              | string          | Filters access by the ID of an AWS FIS action                                                                                                        |
| `dynamodb:FisTargetArns`            | list of ARNs    | Filters access by the ARN of an AWS FIS target                                                                                                       |
| `dynamodb:FourthPartitionKeyValues` | list of strings | Filters access by the forth partition key of the table                                                                                               |
| `dynamodb:FullTableScan`            | true / false    | Filters access by blocking full table scan                                                                                                           |
| `dynamodb:LeadingKeys`              | list of strings | Filters access by the first partition key of the table                                                                                               |
| `dynamodb:ReturnConsumedCapacity`   | string          | Filters access by the ReturnConsumedCapacity parameter of a request. Contains either "TOTAL" or "NONE"                                               |
| `dynamodb:ReturnValues`             | string          | Filters access by the ReturnValues parameter of request. Contains one of the following: "ALL_OLD", "UPDATED_ OLD","ALL_NEW","UPDATED_NEW", or "NONE" |
| `dynamodb:SecondPartitionKeyValues` | list of strings | Filters access by the second partition key of the table                                                                                              |
| `dynamodb:Select`                   | string          | Filters access by the Select parameter of a Query or Scan request                                                                                    |
| `dynamodb:ThirdPartitionKeyValues`  | list of strings | Filters access by the third partition key of the table                                                                                               |

### ebs

| Key                  | Value  | Description                                                                     |
| -------------------- | ------ | ------------------------------------------------------------------------------- |
| `ebs:Description`    | string | Filters access by the description of the snapshot being created                 |
| `ebs:ParentSnapshot` | ARN    | Filters access by the ARN of the parent snapshot                                |
| `ebs:VolumeSize`     | number | Filters access by the size of the volume for the snapshot being created, in GiB |

### ec2

| Key                                          | Value           | Description                                                                                                                                                              |
| -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ec2:AccepterVpc`                            | ARN             | Filters access by the ARN of an accepter VPC in a VPC peering connection                                                                                                 |
| `ec2:Add/group`                              | string          | Filters access by the group being added to a snapshot                                                                                                                    |
| `ec2:Add/userId`                             | string          | Filters access by the account id being added to a snapshot                                                                                                               |
| `ec2:AllocationId`                           | string          | Filters access by the allocation ID of the Elastic IP address                                                                                                            |
| `ec2:AssociatePublicIpAddress`               | true / false    | Filters access by whether the user wants to associate a public IP address with the instance                                                                              |
| `ec2:Attribute`                              | string          | Filters access by an attribute of a resource                                                                                                                             |
| `ec2:Attribute/${AttributeName}`             | string          | Filters access by an attribute being set on a resource                                                                                                                   |
| `ec2:AuthenticationType`                     | string          | Filters access by the authentication type for the VPN tunnel endpoints                                                                                                   |
| `ec2:AuthorizedService`                      | string          | Filters access by the AWS service that has permission to use a resource                                                                                                  |
| `ec2:AuthorizedUser`                         | string          | Filters access by an IAM principal that has permission to use a resource                                                                                                 |
| `ec2:AutoPlacement`                          | string          | Filters access by the Auto Placement properties of a Dedicated Host                                                                                                      |
| `ec2:AvailabilityZone`                       | string          | Filters access by the name of an Availability Zone in an AWS Region                                                                                                      |
| `ec2:AvailabilityZoneId`                     | string          | Filters access by the ID of an Availability Zone in an AWS Region                                                                                                        |
| `ec2:CapacityReservationFleet`               | ARN             | Filters access by the ARN of the Capacity Reservation Fleet                                                                                                              |
| `ec2:ClientRootCertificateChainArn`          | ARN             | —                                                                                                                                                                        |
| `ec2:CloudwatchLogGroupArn`                  | ARN             | Filters access by the ARN of the CloudWatch Logs log group                                                                                                               |
| `ec2:CloudwatchLogStreamArn`                 | ARN             | Filters access by the ARN of the CloudWatch Logs log stream                                                                                                              |
| `ec2:CommitmentDuration`                     | number          | Filters access by commitment duration of the Capacity Reservation                                                                                                        |
| `ec2:CpuOptionsAmdSevSnp`                    | string          | Filters access by the state of AMD SEV-SNP CPU Options. Currently, only US East (Ohio) and Europe (Ireland) are supported                                                |
| `ec2:CreateAction`                           | string          | Filters access by the name of a resource-creating API action                                                                                                             |
| `ec2:CreateDate`                             | ISO 8601 date   | Filters access by the date and time at which the Capacity Reservation was created                                                                                        |
| `ec2:DPDTimeoutSeconds`                      | number          | Filters access by the duration after which DPD timeout occurs on a VPN tunnel                                                                                            |
| `ec2:DestinationCapacityReservationId`       | ARN             | Filters access by the ID of the Capacity Reservation that you want to move capacity into                                                                                 |
| `ec2:DhcpOptionsID`                          | string          | Filters access by the ID of a dynamic host configuration protocol (DHCP) options set                                                                                     |
| `ec2:DirectoryArn`                           | ARN             | Filters access by the ARN of the directory                                                                                                                               |
| `ec2:Domain`                                 | string          | Filters access by the domain of the Elastic IP address                                                                                                                   |
| `ec2:EbsOptimized`                           | true / false    | Filters access by whether the instance is enabled for EBS optimization                                                                                                   |
| `ec2:ElasticGpuType`                         | string          | Filters access by the type of Elastic Graphics accelerator                                                                                                               |
| `ec2:Encrypted`                              | true / false    | Filters access by whether the EBS volume is encrypted                                                                                                                    |
| `ec2:EndDate`                                | ISO 8601 date   | Filters access by the date and time at which the Capacity Reservation ends                                                                                               |
| `ec2:EndDateType`                            | string          | Filters access by the way in which the Capacity Reservati on ends                                                                                                        |
| `ec2:EphemeralStorage`                       | true / false    | Filters access by whether the instance is enabled for ephemeral storage                                                                                                  |
| `ec2:FisActionId`                            | string          | Filters access by the ID of an AWS FIS action                                                                                                                            |
| `ec2:FisTargetArns`                          | list of ARNs    | Filters access by the ARN of an AWS FIS target                                                                                                                           |
| `ec2:GatewayType`                            | string          | Filters access by the gateway type for a VPN endpoint on the AWS side of a VPN connection                                                                                |
| `ec2:HostRecovery`                           | string          | Filters access by whether host recovery is enabled for a Dedicated Host                                                                                                  |
| `ec2:IKEVersions`                            | list of strings | Filters access by the internet key exchange (IKE) versions that are permitted for a VPN tunnel                                                                           |
| `ec2:ImageID`                                | string          | Filters access by the ID of an image                                                                                                                                     |
| `ec2:ImageType`                              | string          | Filters access by the type of image (machine, aki, or ari)                                                                                                               |
| `ec2:InsideTunnelCidr`                       | string          | Filters access by the range of inside IP addresses for a VPN tunnel                                                                                                      |
| `ec2:InsideTunnelIpv6Cidr`                   | string          | Filters access by a range of inside IPv6 addresses for a VPN tunnel                                                                                                      |
| `ec2:InstanceAutoRecovery`                   | string          | Filters access by whether the instance type supports auto recovery                                                                                                       |
| `ec2:InstanceBandwidthWeighting`             | string          | Filters access by the bandwidth weighting of an instance                                                                                                                 |
| `ec2:InstanceCount`                          | number          | Filters access by the number of instances                                                                                                                                |
| `ec2:InstanceID`                             | string          | Filters access by the ID of an instance                                                                                                                                  |
| `ec2:InstanceMarketType`                     | string          | Filters access by the market or purchasing option of an instance (capacity-block, on-demand, or spot)                                                                    |
| `ec2:InstanceMatchCriteria`                  | string          | Filters access by the type of instance launches that the Capacity Reservation accepts                                                                                    |
| `ec2:InstanceMetadataTags`                   | string          | Filters access by whether the instance allows access to instance tags from the instance metadata                                                                         |
| `ec2:InstancePlatform`                       | ARN             | Filters access by the type of operating system for which the Capacity Reservation reserves capacity                                                                      |
| `ec2:InstanceProfile`                        | ARN             | —                                                                                                                                                                        |
| `ec2:InstanceType`                           | string          | Filters access by the type of instance                                                                                                                                   |
| `ec2:InternetGatewayID`                      | string          | Filters access by the ID of an internet gateway                                                                                                                          |
| `ec2:InterruptibleCapacityReservationId`     | string          | Filters access by the ID of an interruptible Capacity Reservation                                                                                                        |
| `ec2:InterruptionType`                       | string          | Filters access by the type of interruption                                                                                                                               |
| `ec2:IpamPrefixListResolverTargetId`         | string          | —                                                                                                                                                                        |
| `ec2:Ipv4IpamPoolId`                         | string          | Filters access by the ID of an IPAM pool provided for IPv4 CIDR block allocation                                                                                         |
| `ec2:Ipv6IpamPoolId`                         | string          | Filters access by the ID of an IPAM pool provided for IPv6 CIDR block allocation                                                                                         |
| `ec2:IsInterruptible`                        | true / false    | Filters access by whether Capacity Reservations are interruptible                                                                                                        |
| `ec2:IsLaunchTemplateResource`               | true / false    | Filters access by whether users are able to override resources that are specified in the launch template                                                                 |
| `ec2:KeyPairName`                            | string          | Filters access by the name of a key pair                                                                                                                                 |
| `ec2:KeyPairType`                            | string          | Filters access by the type of a key pair                                                                                                                                 |
| `ec2:KmsKeyId`                               | string          | Filters access by the ID of an AWS KMS key provided in the request                                                                                                       |
| `ec2:LaunchTemplate`                         | ARN             | Filters access by the ARN of a launch template                                                                                                                           |
| `ec2:Location`                               | string          | Filters access by the destination for the snapshot copy                                                                                                                  |
| `ec2:ManagedResourceOperator`                | string          | Filters access by the presence of an EC2 operator provisioning a managed resource                                                                                        |
| `ec2:MetadataHttpEndpoint`                   | string          | Filters access by whether the HTTP endpoint is enabled for the instance metadata service                                                                                 |
| `ec2:MetadataHttpPutResponseHopLimit`        | number          | Filters access by the allowed number of hops when calling the instance metadata service                                                                                  |
| `ec2:MetadataHttpTokens`                     | string          | Filters access by whether tokens are required when calling the instance metadata service (optional or required)                                                          |
| `ec2:NetworkAclID`                           | string          | Filters access by the ID of a network access control list (ACL)                                                                                                          |
| `ec2:NetworkInterfaceID`                     | string          | Filters access by the ID of an elastic network interface                                                                                                                 |
| `ec2:NewInstanceProfile`                     | ARN             | —                                                                                                                                                                        |
| `ec2:OutpostArn`                             | ARN             | Filters access by the ARN of the Outpost                                                                                                                                 |
| `ec2:Owner`                                  | string          | Filters access by the owner of the resource (amazon, aws-marketplace, or an AWS account ID)                                                                              |
| `ec2:ParentSnapshot`                         | ARN             | Filters access by the ARN of the parent snapshot                                                                                                                         |
| `ec2:ParentVolume`                           | ARN             | Filters access by the ARN of the parent volume from which the snapshot was created                                                                                       |
| `ec2:Permission`                             | string          | Filters access by the type of permission for a resource (INSTANCE-ATTACH or EIP-ASSOCIATE)                                                                               |
| `ec2:Phase1DHGroup`                          | list of strings | Filters access by the Diffie-Hellman group numbers that are permitted for a VPN tunnel for the phase 1 IKE negotiations                                                  |
| `ec2:Phase1EncryptionAlgorithms`             | list of strings | Filters access by the encryption algorithms that are permitted for a VPN tunnel for the phase 1 IKE negotiati ons                                                        |
| `ec2:Phase1IntegrityAlgorithms`              | list of strings | Filters access by the integrity algorithms that are permitted for a VPN tunnel for the phase 1 IKE negotiati ons                                                         |
| `ec2:Phase1LifetimeSeconds`                  | number          | Filters access by the lifetime in seconds for phase 1 of the IKE negotiations for a VPN tunnel                                                                           |
| `ec2:Phase2DHGroup`                          | list of strings | Filters access by the Diffie-Hellman group numbers that are permitted for a VPN tunnel for the phase 2 IKE negotiations                                                  |
| `ec2:Phase2EncryptionAlgorithms`             | list of strings | Filters access by the encryption algorithms that are permitted for a VPN tunnel for the phase 2 IKE negotiati ons                                                        |
| `ec2:Phase2IntegrityAlgorithms`              | list of strings | Filters access by the integrity algorithms that are permitted for a VPN tunnel for the phase 2 IKE negotiati ons                                                         |
| `ec2:Phase2LifetimeSeconds`                  | number          | Filters access by the lifetime in seconds for phase 2 of the IKE negotiations for a VPN tunnel                                                                           |
| `ec2:PlacementGroup`                         | ARN             | Filters access by the ARN of the placement group                                                                                                                         |
| `ec2:PlacementGroupName`                     | string          | Filters access by the name of a placement group                                                                                                                          |
| `ec2:PlacementGroupStrategy`                 | string          | Filters access by the instance placement strategy used by the placement group (cluster, spread, or partition)                                                            |
| `ec2:ProductCode`                            | string          | Filters access by the product code that is associated with the AMI                                                                                                       |
| `ec2:Public`                                 | true / false    | Filters access by whether the image has public launch permissions                                                                                                        |
| `ec2:PublicIpAddress`                        | string          | Filters access by a public IP address                                                                                                                                    |
| `ec2:Quantity`                               | number          | Filters access by the number of Dedicated Hosts in a request                                                                                                             |
| `ec2:Region`                                 | string          | Filters access by the name of the AWS Region                                                                                                                             |
| `ec2:RekeyFuzzPercentage`                    | number          | Filters access by the percentage of increase of the rekey window (determined by the rekey margin time) within which the rekey time is randomly selected for a VPN tunnel |
| `ec2:RekeyMarginTimeSeconds`                 | number          | Filters access by the margin time before the phase 2 lifetime expires for a VPN tunnel                                                                                   |
| `ec2:Remove/group`                           | string          | Filters access by the group being removed from a snapshot                                                                                                                |
| `ec2:Remove/userId`                          | string          | Filters access by the account id being removed from a snapshot                                                                                                           |
| `ec2:ReplayWindowSizePackets`                | string          | Filters access by the number of packets in an IKE replay window                                                                                                          |
| `ec2:RequesterVpc`                           | ARN             | Filters access by the ARN of a requester VPC in a VPC peering connection                                                                                                 |
| `ec2:ReservedInstancesOfferingType`          | string          | —                                                                                                                                                                        |
| `ec2:ResourceTag/${TagKey}`                  | string          | Filters access by tags associated with the resource                                                                                                                      |
| `ec2:RoleDelivery`                           | number          | Filters access by the version of the instance metadata service for retrieving IAM role credentials for EC2                                                               |
| `ec2:RootDeviceType`                         | string          | Filters access by the root device type of the instance (ebs or instance-store)                                                                                           |
| `ec2:RouteTableID`                           | string          | Filters access by the ID of a route table                                                                                                                                |
| `ec2:RoutingType`                            | string          | Filters access by the routing type for the VPN connection                                                                                                                |
| `ec2:SamlProviderArn`                        | ARN             | Filters access by the ARN of the IAM SAML identity provider                                                                                                              |
| `ec2:SecurityGroupID`                        | string          | Filters access by the ID of a security group                                                                                                                             |
| `ec2:ServerCertificateArn`                   | ARN             | —                                                                                                                                                                        |
| `ec2:SnapshotCoolOffPeriod`                  | number          | Filters access by the compliance mode cooling-off period                                                                                                                 |
| `ec2:SnapshotID`                             | string          | Filters access by the ID of a snapshot                                                                                                                                   |
| `ec2:SnapshotLockDuration`                   | number          | Filters access by the snapshot lock duration                                                                                                                             |
| `ec2:SnapshotTime`                           | string          | Filters access by the initiation time of a snapshot                                                                                                                      |
| `ec2:SourceAvailabilityZone`                 | string          | Filters access by the name of the Availability Zone from which the request originated                                                                                    |
| `ec2:SourceCapacityReservationId`            | ARN             | Filters access by the ID of the Capacity Reservation from which you want to move capacity                                                                                |
| `ec2:SourceInstanceARN`                      | ARN             | Filters access by the ARN of the instance from which the request originated                                                                                              |
| `ec2:SourceOutpostArn`                       | ARN             | Filters access by the ARN of the Outpost from which the request originated                                                                                               |
| `ec2:Subnet`                                 | ARN             | Filters access by the ARN of the subnet                                                                                                                                  |
| `ec2:SubnetID`                               | string          | Filters access by the ID of a subnet                                                                                                                                     |
| `ec2:TargetInstanceCount`                    | number          | Filters access by the number of instances the interrupt ible Capacity Reservation is assigned                                                                            |
| `ec2:Tenancy`                                | string          | Filters access by the tenancy of the VPC or instance (default, dedicated, or host)                                                                                       |
| `ec2:VolumeID`                               | string          | Filters access by the ID of a volume                                                                                                                                     |
| `ec2:VolumeInitializationRate`               | number          | Filters access by the initialization rate of the volume, in MiBps                                                                                                        |
| `ec2:VolumeIops`                             | number          | Filters access by the the number of input/output operations per second (IOPS) provisioned for the volume                                                                 |
| `ec2:VolumeSize`                             | number          | Filters access by the size of the volume, in GiB                                                                                                                         |
| `ec2:VolumeThroughput`                       | number          | Filters access by the throughput of the volume, in MiBps                                                                                                                 |
| `ec2:VolumeType`                             | string          | Filters access by the type of volume (gp2, gp3, io1, io2, st1, sc1, or standard)                                                                                         |
| `ec2:Vpc`                                    | ARN             | Filters access by the ARN of the VPC                                                                                                                                     |
| `ec2:VpcID`                                  | string          | Filters access by the ID of a virtual private cloud (VPC)                                                                                                                |
| `ec2:VpcPeeringConnectionID`                 | string          | Filters access by the ID of a VPC peering connection                                                                                                                     |
| `ec2:VpceMultiRegion`                        | string          | Filters access by multi region of the VPC endpoint service                                                                                                               |
| `ec2:VpcePrivateDnsPreference`               | string          | Filters access by the private DNS preference                                                                                                                             |
| `ec2:VpcePrivateDnsSpecifiedDomains`         | list of strings | —                                                                                                                                                                        |
| `ec2:VpceServiceName`                        | string          | Filters access by the name of the VPC endpoint service                                                                                                                   |
| `ec2:VpceServiceOwner`                       | string          | Filters access by the service owner of the VPC endpoint service (amazon, aws-marketplace, or an AWS account ID)                                                          |
| `ec2:VpceServicePrivateDnsName`              | string          | Filters access by the private DNS name of the VPC endpoint service                                                                                                       |
| `ec2:VpceServiceRegion`                      | string          | Filters access by the region of the VPC endpoint service                                                                                                                 |
| `ec2:VpceSupportedRegion`                    | string          | Filters access by the supported region of the VPC endpoint service                                                                                                       |
| `ec2:transitGatewayAttachmentId`             | string          | Filters access by the ID of a transit gateway attachment                                                                                                                 |
| `ec2:transitGatewayConnectPeerId`            | string          | Filters access by the ID of a transit gateway connect peer                                                                                                               |
| `ec2:transitGatewayId`                       | string          | Filters access by the ID of a transit gateway                                                                                                                            |
| `ec2:transitGatewayMeteringPolicyId`         | string          | Filters access by the ID of a metering policy id                                                                                                                         |
| `ec2:transitGatewayMulticastDomainId`        | string          | Filters access by the ID of a transit gateway multicast domain                                                                                                           |
| `ec2:transitGatewayPolicyTableId`            | string          | Filters access by the ID of a transit gateway policy table                                                                                                               |
| `ec2:transitGatewayRouteTableAnnouncementId` | string          | Filters access by the ID of a transit gateway route table announcement                                                                                                   |
| `ec2:transitGatewayRouteTableId`             | string          | Filters access by the ID of a transit gateway route table                                                                                                                |

### ec2-instance-connect

| Key                                      | Value      | Description                                                                                          |
| ---------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `ec2-instance-connect:maxTunnelDuration` | number     | Filters access by maximum session duration associated with the instance                              |
| `ec2-instance-connect:privateIpAddress`  | IP address | Filters access by private IP Address associated with the instance                                    |
| `ec2-instance-connect:remotePort`        | number     | Filters access by port number associated with the instance                                           |
| `ec2:ResourceTag/${TagKey}`              | string     | Filters access by tags associated with the resource                                                  |
| `ec2:osuser`                             | string     | Filters access by specifying the default user name for the AMI that you used to launch your instance |

### ec2messages

| Key                     | Value | Description                                                                                                                                                                                                                                                                           |
| ----------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ec2:SourceInstanceARN` | ARN   | Filters access by the ARN of the instance from which the request originated                                                                                                                                                                                                           |
| `ssm:SourceInstanceARN` | ARN   | Filters access by verifying the Amazon Resource Name (ARN) of the AWS Systems Manager's managed instance from which the request is made. This key is not present when the request comes from the managed instance authenticated with an IAM role associated with EC2 instance profile |

### ecr

| Key                         | Value  | Description                                              |
| --------------------------- | ------ | -------------------------------------------------------- |
| `ecr:AccountSetting`        | string | Filters access by the ECR account setting name           |
| `ecr:ResourceTag/${TagKey}` | string | Filters access by tag-value associated with the resource |

### ecr-public

| Key                                | Value  | Description                                                     |
| ---------------------------------- | ------ | --------------------------------------------------------------- |
| `ecr-public:ResourceTag/${TagKey}` | string | Filters actions based on tag-value associated with the resource |

### ecs

| Key                                      | Value           | Description                                                                                                                          |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `ecs:CreateAction`                       | string          | Filters access by the name of a resource-creating API action                                                                         |
| `ecs:ResourceTag/${TagKey}`              | string          | Filters access by the tag key-value pairs attached to the resource                                                                   |
| `ecs:account-setting`                    | string          | Filters access by the Amazon ECS account setting name                                                                                |
| `ecs:auto-assign-public-ip`              | true / false    | Filters access by the public IP assignment configuration of your Amazon ECS task or Amazon ECS service that uses awsvpc network mode |
| `ecs:capacity-provider`                  | list of ARNs    | Filters access by the ARN of an Amazon ECS capacity provider                                                                         |
| `ecs:cluster`                            | ARN             | Filters access by the ARN of an Amazon ECS cluster                                                                                   |
| `ecs:compute-compatibility`              | list of strings | Filters access by the required compatibilities field provided in the request                                                         |
| `ecs:container-instances`                | ARN             | Filters access by the ARN of an Amazon ECS container instance                                                                        |
| `ecs:container-name`                     | string          | Filters access by the name of an Amazon ECS container which is defined in the ECS task definition                                    |
| `ecs:daemon`                             | ARN             | Filters access by the ARN of an Amazon ECS daemon                                                                                    |
| `ecs:daemon-task-definition`             | ARN             | —                                                                                                                                    |
| `ecs:enable-ebs-volumes`                 | string          | Filters access by the Amazon ECS managed Amazon EBS volume capability of your ECS task or service                                    |
| `ecs:enable-ecs-managed-tags`            | true / false    | Filters access by the enableECSManagedTags configuration of your Amazon ECS task or Amazon ECS service                               |
| `ecs:enable-execute-command`             | string          | Filters access by the execute-command capability of your Amazon ECS task or Amazon ECS service                                       |
| `ecs:enable-service-connect`             | string          | Filters access by the enable field value in the Service Connect configuration                                                        |
| `ecs:enable-vpc-lattice`                 | string          | Filters access by the VPC lattice capability of your Amazon ECS service                                                              |
| `ecs:fargate-ephemeral-storage-kms-key`  | string          | Filters access by the AWS KMS key id provided in the request                                                                         |
| `ecs:gateway`                            | ARN             | Filters access by the ARN of an Amazon ECS gateway                                                                                   |
| `ecs:instance-metadata-tags-propagation` | true / false    | Filters access by the instance metadata tags propagation setting of your Amazon ECS capacity provider                                |
| `ecs:namespace`                          | ARN             | Filters access by the ARN of AWS Cloud Map namespace which is defined in the Service Connect Configuration                           |
| `ecs:privileged`                         | string          | Filters access by the privileged field provided in the request                                                                       |
| `ecs:propagate-tags`                     | string          | Filters access by the tag propagation configuration of your Amazon ECS task or Amazon ECS service                                    |
| `ecs:service`                            | ARN             | Filters access by the ARN of an Amazon ECS service                                                                                   |
| `ecs:subnet`                             | list of strings | Filters access by the subnet configuration of your Amazon ECS task or Amazon ECS service that uses awsvpc network mode               |
| `ecs:task`                               | ARN             | Filters access by the ARN of an Amazon ECS task                                                                                      |
| `ecs:task-cpu`                           | number          | Filters access by the task cpu, as an integer with 1024 = 1 vCPU, provided in the request                                            |
| `ecs:task-definition`                    | ARN             | —                                                                                                                                    |
| `ecs:task-memory`                        | number          | Filters access by the task memory, as an integer representing MiB, provided in the request                                           |

### eks

| Key                                           | Value           | Description                                                                                                                        |
| --------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `eks:accessEntryType`                         | string          | Filters access by the access entry type present in the access entry requests the user makes to the EKS service                     |
| `eks:accessScope`                             | string          | Filters access by the accessScope present in the associate / disassociate access policy requests the user makes to the EKS service |
| `eks:authenticationMode`                      | string          | Filters access by the authenticationMode present in the create / update cluster request                                            |
| `eks:blockStorageEnabled`                     | true / false    | Filters access by the block storage enabled parameter in the create / update cluster request                                       |
| `eks:bootstrapClusterCreatorAdminPermissions` | true / false    | Filters access by the bootstrapClusterCreatorAdmi nPermissions present in the create cluster request                               |
| `eks:bootstrapSelfManagedAddons`              | true / false    | Filters access by the bootstrapSelfManagedAddons present in the create cluster request                                             |
| `eks:clientId`                                | string          | Filters access by the clientId present in the associate IdentityProviderConfig request the user makes to the EKS service           |
| `eks:clusterName`                             | string          | Filters access by the clusterName present in the access entry requests the user makes to the EKS service                           |
| `eks:computeConfigEnabled`                    | true / false    | —                                                                                                                                  |
| `eks:controlPlaneEgressMode`                  | string          | Filters access by the control plane egress mode specified in the create / update cluster request                                   |
| `eks:controlPlaneScalingTier`                 | string          | Filters access by the control plane scaling tier in the create / update cluster request                                            |
| `eks:deletionProtection`                      | true / false    | Filters access by the deletion protection setting in the create / update cluster request                                           |
| `eks:elasticLoadBalancingEnabled`             | true / false    | Filters access by the elastic load balancing enabled parameter in the create / update cluster request                              |
| `eks:encryptionConfigProviderKeyArns`         | list of ARNs    | Filters access by the KMS key ARNs in the create cluster / Associate Encryption Config request                                     |
| `eks:endpointPrivateAccess`                   | true / false    | Filters access by the endpoint private access setting in the create / update cluster request                                       |
| `eks:endpointPublicAccess`                    | true / false    | Filters access by the endpoint public access setting in the create / update cluster request                                        |
| `eks:issuerUrl`                               | string          | Filters access by the issuerUrl present in the associate IdentityProviderConfig request the user makes to the EKS service          |
| `eks:kubeApiServerConfig`                     | true / false    | —                                                                                                                                  |
| `eks:kubeControllerManagerConfig`             | true / false    | —                                                                                                                                  |
| `eks:kubeSchedulerConfig`                     | true / false    | —                                                                                                                                  |
| `eks:kubernetesGroups`                        | list of strings | Filters access by the kubernetesGroups present in the access entry requests the user makes to the EKS service                      |
| `eks:kubernetesVersion`                       | string          | Filters access by the Kubernetes version in the create cluster/ update cluster version request                                     |
| `eks:loggingType/${type}`                     | true / false    | Filters access by the cluster logging enabled and type parameter in the create / update cluster request                            |
| `eks:namespaces`                              | list of strings | Filters access by the namespaces present in the associate / disassociate access policy requests the user makes to the EKS service  |
| `eks:policyArn`                               | ARN             | Filters access by the policyArn present in the access entry requests the user makes to the EKS service                             |
| `eks:principalArn`                            | ARN             | Filters access by the principalArn present in the access entry requests requests the user makes to the EKS service                 |
| `eks:supportType`                             | string          | Filters access by the supportType present in the create / update cluster request                                                   |
| `eks:username`                                | string          | Filters access by the Kubernetes username present in the access entry requests the user makes to the EKS service                   |
| `eks:zonalShiftEnabled`                       | true / false    | Filters access by the zonal shift enabled setting in the create / update cluster request                                           |

### elasticache

| Key                                    | Value        | Description                                                                                                                                                                                                           |
| -------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `elasticache:AtRestEncryptionEnabled`  | true / false | Filters access by the AtRestEncryptionEnabled parameter present in the request or default false value if parameter is not present                                                                                     |
| `elasticache:AuthTokenEnabled`         | true / false | Filters access by the presence of non empty AuthToken parameter in the request                                                                                                                                        |
| `elasticache:AutomaticFailoverEnabled` | true / false | Filters access by the AutomaticFailoverEnabled parameter in the request                                                                                                                                               |
| `elasticache:CacheNodeType`            | string       | Filters access by the cacheNodeType parameter present in the request. This key can be used to restrict which cache node types can be used on cluster creation or scaling operations                                   |
| `elasticache:CacheParameterGroupName`  | string       | Filters access by the CacheParameterGroupName parameter in the request                                                                                                                                                |
| `elasticache:ClusterModeEnabled`       | true / false | Filters access by the cluster mode parameter present in the request. Default value for single node group (shard) creations is false                                                                                   |
| `elasticache:DataStorageUnit`          | string       | Filters access by the CacheUsageLimits.DataStorage.Unit parameter in the CreateServerlessCache and ModifySer verlessCache request                                                                                     |
| `elasticache:Durability`               | string       | Filters access by the Durability parameter in the request. Valid values are default, async, sync, or disabled                                                                                                         |
| `elasticache:EngineType`               | string       | Filters access by the engine type present in creation requests. For replication group creations, default engine 'redis' is used as key if parameter is not present                                                    |
| `elasticache:EngineVersion`            | string       | Filters access by the engineVersion parameter present in creation or cluster modification requests                                                                                                                    |
| `elasticache:KmsKeyId`                 | string       | Filters access by the Key ID of the KMS key                                                                                                                                                                           |
| `elasticache:MaximumDataStorage`       | number       | Filters access by the CacheUsageLimits.DataStorag e.Maximum parameter in the CreateServerlessCache and ModifyServerlessCache request                                                                                  |
| `elasticache:MaximumECPUPerSecond`     | number       | Filters access by the CacheUsageLimits.ECPUPerSec ond.Maximum parameter in the CreateServerlessCache and ModifyServerlessCache request                                                                                |
| `elasticache:MinimumDataStorage`       | number       | Filters access by the CacheUsageLimits.DataStorag e.Minimum parameter in the CreateServerlessCache and ModifyServerlessCache request                                                                                  |
| `elasticache:MinimumECPUPerSecond`     | number       | Filters access by the CacheUsageLimits.ECPUPerSec ond.Minimum parameter in the CreateServerlessCache and ModifyServerlessCache request                                                                                |
| `elasticache:MultiAZEnabled`           | true / false | Filters access by the AZMode parameter, MultiAZEn abled parameter or the number of availability zones that the cluster or replication group can be placed in                                                          |
| `elasticache:NumNodeGroups`            | number       | Filters access by the NumNodeGroups or NodeGroup Count parameter specified in the request. This key can be used to restrict the number of node groups (shards) clusters can have after creation or scaling operations |
| `elasticache:ReplicasPerNodeGroup`     | number       | Filters access by the number of replicas per node group (shards) specified in creations or scaling requests                                                                                                           |
| `elasticache:SnapshotRetentionLimit`   | number       | Filters access by the SnapshotRetentionLimit parameter in the request                                                                                                                                                 |
| `elasticache:TransitEncryptionEnabled` | true / false | Filters access by the TransitEncryptionEnabled parameter present in the request. For replication group creations, default value 'false' is used as key if parameter is not present                                    |
| `elasticache:UserAuthenticationMode`   | string       | Filters access by the UserAuthenticationMode parameter in the request                                                                                                                                                 |

### elasticbeanstalk

| Key                                          | Value | Description                                                                                    |
| -------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| `elasticbeanstalk:FromApplication`           | ARN   | Filters access by an application as a dependency or a constraint on an input parameter         |
| `elasticbeanstalk:FromApplicationVersion`    | ARN   | Filters access by an application version as a dependency or a constraint on an input parameter |
| `elasticbeanstalk:FromConfigurationTemplate` | ARN   | —                                                                                              |
| `elasticbeanstalk:FromEnvironment`           | ARN   | Filters access by an environment as a dependency or a constraint on an input parameter         |
| `elasticbeanstalk:FromPlatform`              | ARN   | Filters access by a platform as a dependency or a constraint on an input parameter             |
| `elasticbeanstalk:FromSolutionStack`         | ARN   | Filters access by a solution stack as a dependency or a constraint on an input parameter       |
| `elasticbeanstalk:InApplication`             | ARN   | Filters access by the application that contains the resource that the action operates on       |

### elasticfilesystem

| Key                                        | Value        | Description |
| ------------------------------------------ | ------------ | ----------- |
| `elasticfilesystem:AccessPointArn`         | ARN          | —           |
| `elasticfilesystem:AccessedViaMountTarget` | true / false | —           |
| `elasticfilesystem:CreateAction`           | string       | —           |
| `elasticfilesystem:Encrypted`              | true / false | —           |

### elasticloadbalancing

| Key                                          | Value                     | Description                                                                                       |
| -------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| `elasticloadbalancing:CreateAction`          | string                    | Filters access by the name of a resource-creating API action                                      |
| `elasticloadbalancing:ListenerProtocol`      | list of strings or string | Filters access by the listener protocol that is allowed in the request                            |
| `elasticloadbalancing:ResourceTag/`          | string                    | Filters access by the preface string for a tag key and value pair that are attached to a resource |
| `elasticloadbalancing:ResourceTag/${TagKey}` | string                    | Filters access by the tags associated with the managed resource                                   |
| `elasticloadbalancing:Scheme`                | string                    | Filters access by the load balancer scheme that is allowed in the request                         |
| `elasticloadbalancing:SecurityGroup`         | list of strings           | Filters access by the security-group IDs that are allowed in the request                          |
| `elasticloadbalancing:SecurityPolicy`        | list of strings           | Filters access by the SSL Security Policies that are allowed in the request                       |
| `elasticloadbalancing:Subnet`                | list of strings           | Filters access by the subnet IDs that are allowed in the request                                  |

### elasticmapreduce

| Key                                      | Value  | Description                                                                     |
| ---------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| `elasticmapreduce:ExecutionRoleArn`      | ARN    | Filters access by whether the execution role ARN is provided with the action    |
| `elasticmapreduce:RequestTag/${TagKey}`  | string | Filters access by whether the tag and value pair is provided with the action    |
| `elasticmapreduce:ResourceTag/${TagKey}` | string | Filters access by the tag and value pair associated with an Amazon EMR resource |

### emr-containers

| Key                               | Value | Description                                                     |
| --------------------------------- | ----- | --------------------------------------------------------------- |
| `emr-containers:ExecutionRoleArn` | ARN   | Filters access by the execution role arn present in the request |
| `emr-containers:JobTemplateArn`   | ARN   | Filters access by the job template arn present in the request   |

### events

| Key                                      | Value           | Description                                                                                                                                                                          |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `events:EventBusArn`                     | list of ARNs    | Filters access by the ARN of the event buses that can be associated with an endpoint to CreateEndpoint and UpdateEndpoint actions                                                    |
| `events:ManagedBy`                       | string          | Filters access by AWS services. If a rule is created by an AWS service on your behalf, the value is the principal name of the service that created the rule                          |
| `events:TargetArn`                       | list of ARNs    | Filters access by the ARN of a target that can be put to a rule to PutTargets actions. TargetARN doesn't include DeadLetterConfigArn                                                 |
| `events:creatorAccount`                  | string          | Filters access by the account the rule was created in to rule actions                                                                                                                |
| `events:detail-type`                     | list of strings | Filters access by the literal string of the detail-type of the event to PutEvents and PutRule actions                                                                                |
| `events:detail.eventTypeCode`            | string          | Filters access by the literal string for the detail.ev entTypeCode field of the event to PutRule actions                                                                             |
| `events:detail.service`                  | string          | Filters access by the literal string for the detail.service field of the event to PutRule actions                                                                                    |
| `events:detail.userIdentity.principalId` | string          | Filters access by the literal string for the detail.us eridentity.principalid field of the event to PutRule actions                                                                  |
| `events:eventBusInvocation`              | string          | Filters access by whether the event was generated via API or cross-account bus invocation to PutEvents actions                                                                       |
| `events:source`                          | list of strings | Filters access by the AWS service or AWS partner event source that generated the event to PutEvents and PutRule actions. Matches the literal string of the source field of the event |

### execute-api

| Key                        | Value | Description                                                 |
| -------------------------- | ----- | ----------------------------------------------------------- |
| `execute-api:viaDomainArn` | ARN   | Filters access by the DomainName ARN the API is called from |

### fis

| Key              | Value           | Description |
| ---------------- | --------------- | ----------- |
| `fis:Operations` | list of strings | —           |
| `fis:Percentage` | number          | —           |
| `fis:Service`    | string          | —           |
| `fis:Targets`    | list of strings | —           |

### fsx

| Key                                               | Value        | Description                                                                                          |
| ------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| `fsx:IsBackupCopyDestination`                     | true / false | Filters access by whether the backup is a destination backup for a CopyBackup operation              |
| `fsx:IsBackupCopySource`                          | true / false | Filters access by whether the backup is a source backup for a CopyBackup operation                   |
| `fsx:NfsDataRepositoryAuthenticationEnabled`      | true / false | Filters access by NFS data repositories which support authentication                                 |
| `fsx:NfsDataRepositoryEncryptionInTransitEnabled` | true / false | Filters access by NFS data repositories which support encryption-in-transit                          |
| `fsx:ParentVolumeId`                              | string       | Filters access by the containing parent volume for mutating volume operations                        |
| `fsx:StorageVirtualMachineId`                     | string       | Filters access by the containing storage virtual machine for a volume for mutating volume operations |

### gameliftstreams

| Key                       | Value | Description                                                                                                  |
| ------------------------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| `gameliftstreams:RoleArn` | ARN   | Filters access by the ARN of the IAM role passed to Amazon GameLift Streams to assume for the stream session |

### geo

| Key               | Value           | Description                                                   |
| ----------------- | --------------- | ------------------------------------------------------------- |
| `geo:DeviceIds`   | list of strings | Filters access by the presence of device ids in the request   |
| `geo:GeofenceIds` | list of strings | Filters access by the presence of geofence ids in the request |

### glacier

| Key                        | Value  | Description                                                                 |
| -------------------------- | ------ | --------------------------------------------------------------------------- |
| `glacier:ArchiveAgeInDays` | string | Filters access by how long an archive has been stored in the vault, in days |
| `glacier:ResourceTag/`     | string | Filters access by a customer-defined tag                                    |

### glue

| Key                                    | Value           | Description                                                                                                           |
| -------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `glue:CredentialIssuingService`        | string          | Filters access by the service from which the credentials of the request is issued                                     |
| `glue:EnabledForRedshiftAutoDiscovery` | true / false    | Filters access by the presence of the key configured for role's identity-based policy                                 |
| `glue:FederatedAuthorizationSource`    | string          | Filters access by whether the resource belongs to federated authorization                                             |
| `glue:LakeFormationPermissions`        | string          | Filters access by whether Lake Formation permission checks will be performed for a given caller and the Glue resource |
| `glue:RoleAssumedBy`                   | string          | Filters access by the service from which the credentia ls of the request is obtained by assuming the customer role    |
| `glue:SecurityGroupIds`                | list of strings | Filters access by the ID of security groups configured for the Glue job                                               |
| `glue:SubnetIds`                       | list of strings | Filters access by the ID of subnets configured for the Glue job                                                       |
| `glue:VpcIds`                          | list of strings | Filters access by the ID of the VPC configured for the Glue job                                                       |

### groundstation

| Key                                     | Value  | Description                                  |
| --------------------------------------- | ------ | -------------------------------------------- |
| `groundstation:AgentId`                 | string | Filters access by the ID of an agent         |
| `groundstation:ConfigId`                | string | Filters access by the ID of a config         |
| `groundstation:ConfigType`              | string | Filters access by the type of a config       |
| `groundstation:ContactId`               | string | Filters access by the ID of a contact        |
| `groundstation:DataflowEndpointGroupId` | string | —                                            |
| `groundstation:EphemerisId`             | string | Filters access by the ID of an ephemeris     |
| `groundstation:GroundStationId`         | string | Filters access by the ID of a ground station |
| `groundstation:MissionProfileId`        | string | —                                            |
| `groundstation:SatelliteId`             | string | Filters access by the ID of a satellite      |

### health

| Key                    | Value  | Description                        |
| ---------------------- | ------ | ---------------------------------- |
| `health:eventTypeCode` | string | Filters access by event type       |
| `health:service`       | string | Filters access by impacted service |

### iam

| Key                                        | Value           | Description                                                                                                |
| ------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `iam:AWSServiceName`                       | string          | Filters access by the AWS service to which this role is attached                                           |
| `iam:AccountPropertyNamespaces`            | list of strings | Filters access by the account property namespaces being read or modified                                   |
| `iam:AssociatedResourceArn`                | ARN             | Filters access by the resource that the role will be used on behalf of                                     |
| `iam:DelegationDuration`                   | string          | Filters access based on the requested delegation duration                                                  |
| `iam:DelegationRequestOwner`               | ARN             | Filters access based on the delegation request owner                                                       |
| `iam:FIDO-FIPS-140-2-certification`        | string          | —                                                                                                          |
| `iam:FIDO-FIPS-140-3-certification`        | string          | —                                                                                                          |
| `iam:FIDO-certification`                   | string          | —                                                                                                          |
| `iam:NotificationChannel`                  | string          | Filters access based on the requested notification channel                                                 |
| `iam:OrganizationsPolicyId`                | string          | Filters access by the ID of an AWS Organizations policy                                                    |
| `iam:PassedToService`                      | string          | Filters access by the AWS service to which this role is passed                                             |
| `iam:PermissionsBoundary`                  | ARN             | Filters access if the specified policy is set as the permissions boundary on the IAM entity (user or role) |
| `iam:PolicyARN`                            | ARN             | Filters access by the ARN of an IAM policy                                                                 |
| `iam:RegisterSecurityKey`                  | string          | Filters access by the current state of MFA device enablement                                               |
| `iam:ResourceTag/${TagKey}`                | string          | Filters access by the tags that are attached to the role that is being assumed                             |
| `iam:RoleTemplateARN`                      | ARN             | Filters access by the role template ARN used in the request                                                |
| `iam:ServiceSpecificCredentialAgeDays`     | number          | —                                                                                                          |
| `iam:ServiceSpecificCredentialServiceName` | string          | —                                                                                                          |
| `iam:TemplateArn`                          | ARN             | Filters access based on the requested template ARN                                                         |

### identitystore

| Key                                    | Value        | Description                                                              |
| -------------------------------------- | ------------ | ------------------------------------------------------------------------ |
| `identitystore:GroupExternalIdIssuers` | list of ARNs | Filters access by Issuer present in ExternalIds for Group resources      |
| `identitystore:IdentityStoreArn`       | ARN          | Filters access by Identity Store ARN                                     |
| `identitystore:PrimaryRegion`          | string       | Filters access by Primary Region of Identity Store                       |
| `identitystore:ReservedUserId`         | string       | Filters access by a previously reserved User ID for CreateUser operation |
| `identitystore:UserExternalIdIssuers`  | list of ARNs | Filters access by Issuer present in ExternalIds for User resources       |
| `identitystore:UserId`                 | string       | Filters access by IAM Identity Center User ID                            |

### imagebuilder

| Key                                         | Value           | Description                                                                                                |
| ------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `imagebuilder:CreatedResourceTag/${TagKey}` | string          | Filters access by the tag key-value pairs attached to the resource created by Image Builder                |
| `imagebuilder:CreatedResourceTagKeys`       | list of strings | Filters access by the presence of tag keys in the request                                                  |
| `imagebuilder:Ec2MetadataHttpTokens`        | string          | Filters access by the EC2 Instance Metadata HTTP Token Requirement specified in the request                |
| `imagebuilder:LifecyclePolicyResourceType`  | string          | Filters access by the Lifecycle Policy Resource Type specified in the request                              |
| `imagebuilder:StatusTopicArn`               | ARN             | Filters access by the SNS Topic Arn in the request to which terminal state notifications will be published |

### iot

| Key                                                            | Value           | Description                                                                                                                      |
| -------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `iot:ClientMode`                                               | string          | Filters access by the mode of the client for IoT Tunnel                                                                          |
| `iot:CommandExecutionParameterBoolean/${CommandParameterName}` | true / false    | —                                                                                                                                |
| `iot:CommandExecutionParameterNumber/${CommandParameterName}`  | number          | Filters access by the command parameter name and numeric value                                                                   |
| `iot:CommandExecutionParameterString/${CommandParameterName}`  | string          | Filters access by the command parameter name and string value                                                                    |
| `iot:Delete`                                                   | true / false    | Filters access by a flag indicating whether or not to also delete an IoT Tunnel immediately when making iot:Close Tunnel request |
| `iot:DomainName`                                               | string          | Filters access by based on the domain name of an IoT DomainConfiguration                                                         |
| `iot:IncludeSocketInformation`                                 | true / false    | Filters access by GetConnection and GetThingConnectivi tyData includeSocketInformation request parameter                         |
| `iot:ThingGroupArn`                                            | list of ARNs    | Filters access by a list of IoT Thing Group ARNs that the destination IoT Thing belongs to for an IoT Tunnel                     |
| `iot:Topic`                                                    | string          | Filters access by based on the topic                                                                                             |
| `iot:TunnelDestinationService`                                 | list of strings | Filters access by a list of destination services for an IoT Tunnel                                                               |
| `iot:thingArn`                                                 | ARN             | Filters access by the ARN of an IoT Thing                                                                                        |

### iotanalytics

| Key                                  | Value  | Description                                                        |
| ------------------------------------ | ------ | ------------------------------------------------------------------ |
| `iotanalytics:ResourceTag/${TagKey}` | string | Filters access by the tag key-value pairs attached to the resource |

### iotevents

| Key                  | Value  | Description                                                 |
| -------------------- | ------ | ----------------------------------------------------------- |
| `iotevents:keyValue` | string | Filters access by the instanceId (key-value) of the message |

### iotfleetwise

| Key                                       | Value           | Description |
| ----------------------------------------- | --------------- | ----------- |
| `iotfleetwise:DestinationArn`             | ARN             | —           |
| `iotfleetwise:Signals`                    | list of strings | —           |
| `iotfleetwise:UpdateToDecoderManifestArn` | ARN             | —           |
| `iotfleetwise:UpdateToModelManifestArn`   | ARN             | —           |

### iotjobsdata

| Key         | Value  | Description                                                                                           |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `iot:JobId` | string | Filters access by jobId for iotjobsdata:DescribeJobExec ution and iotjobsdata:UpdateJobExecution APIs |

### iotmanagedintegrations

| Key                                             | Value  | Description                                  |
| ----------------------------------------------- | ------ | -------------------------------------------- |
| `iotmanagedintegrations:cloudConnectorId`       | string | Filters access by the CloudConnectorId       |
| `iotmanagedintegrations:connectorDestinationId` | string | Filters access by the ConnectorDestinationId |

### iotsitewise

| Key                                         | Value        | Description                                                                                                                             |
| ------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `iotsitewise:assetHierarchyPath`            | string       | Filters access by an asset hierarchy path, which is the string of asset IDs in the asset's hierarchy, each separated by a forward slash |
| `iotsitewise:childAssetId`                  | string       | Filters access by the ID of a child asset being associated whith a parent asset                                                         |
| `iotsitewise:group`                         | string       | Filters access by the ID of an AWS Single Sign-On group                                                                                 |
| `iotsitewise:iam`                           | string       | Filters access by the ID of an AWS IAM identity                                                                                         |
| `iotsitewise:isAssociatedWithAssetProperty` | string       | Filters access by data streams associated with or not associated with asset properties                                                  |
| `iotsitewise:portal`                        | string       | Filters access by the ID of a portal                                                                                                    |
| `iotsitewise:project`                       | string       | Filters access by the ID of a project                                                                                                   |
| `iotsitewise:propertyAlias`                 | string       | Filters access by the property alias                                                                                                    |
| `iotsitewise:propertyId`                    | string       | Filters access by the ID of an asset property                                                                                           |
| `iotsitewise:taskArns`                      | list of ARNs | Filters access by the task ARNs specified in the pipeline request                                                                       |
| `iotsitewise:user`                          | string       | Filters access by the ID of an AWS Single Sign-On user                                                                                  |

### iottwinmaker

| Key                            | Value           | Description                                                 |
| ------------------------------ | --------------- | ----------------------------------------------------------- |
| `iottwinmaker:destinationType` | string          | Filters access by destination type of metadata transfer job |
| `iottwinmaker:linkedServices`  | list of strings | Filters access by workspace linked to services              |
| `iottwinmaker:sourceType`      | string          | Filters access by source type of metadata transfer job      |

### iotwireless

| Key                            | Value  | Description                                                                  |
| ------------------------------ | ------ | ---------------------------------------------------------------------------- |
| `iotwireless:DestinationName`  | string | Filters access by destination name associated with the IoT Wireless resource |
| `iotwireless:DeviceProfileId`  | string | —                                                                            |
| `iotwireless:ServiceProfileId` | string | —                                                                            |

### kafka

| Key                         | Value        | Description                                                            |
| --------------------------- | ------------ | ---------------------------------------------------------------------- |
| `kafka:publicAccessEnabled` | true / false | Filters access by the presence of public access enabled in the request |

### kinesis

| Key                           | Value        | Description                                                                   |
| ----------------------------- | ------------ | ----------------------------------------------------------------------------- |
| `kinesis:FisActionId`         | string       | Filters access by the ID of an AWS FIS action                                 |
| `kinesis:FisInjectPercentage` | number       | Filters access by the percentage of calls being affected by an AWS FIS action |
| `kinesis:FisTargetArns`       | list of ARNs | Filters access by the ARN of an AWS FIS target                                |

### kms

| Key                                             | Value           | Description                                                                                                                                                                                                                                               |
| ----------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kms:BypassPolicyLockoutSafetyCheck`            | true / false    | Filters access to the CreateKey and PutKeyPolicy operations based on the value of the BypassPol icyLockoutSafetyCheck parameter in the request                                                                                                            |
| `kms:CallerAccount`                             | string          | Filters access to specified AWS KMS operations based on the AWS account ID of the caller. You can use this condition key to allow or deny access to all IAM users and roles in an AWS account in a single policy statement                                |
| `kms:CustomerMasterKeySpec`                     | string          | The kms:CustomerMasterKeySpec condition key is deprecated. Instead, use the kms:KeySpec condition key                                                                                                                                                     |
| `kms:CustomerMasterKeyUsage`                    | string          | The kms:CustomerMasterKeyUsage condition key is deprecated. Instead, use the kms:KeyUsage condition key                                                                                                                                                   |
| `kms:DataKeyPairSpec`                           | string          | Filters access to GenerateDataKeyPair and GenerateD ataKeyPairWithoutPlaintext operations based on the value of the KeyPairSpec parameter in the request                                                                                                  |
| `kms:EncryptionAlgorithm`                       | string          | Filters access to encryption operations based on the value of the encryption algorithm in the request                                                                                                                                                     |
| `kms:EncryptionContext:${EncryptionContextKey}` | string          | Filters access to a symmetric AWS KMS key based on the encryption context in a cryptographic operation. This condition evaluates the key and value in each key-value encryption context pair                                                              |
| `kms:EncryptionContextKeys`                     | list of strings | Filters access to a symmetric AWS KMS key based on the encryption context in a cryptographic operation. This condition key evaluates only the key in each key-value encryption context pair                                                               |
| `kms:ExpirationModel`                           | string          | Filters access to the ImportKeyMaterial operation based on the value of the ExpirationModel parameter in the request                                                                                                                                      |
| `kms:GrantConstraintSourceArn`                  | ARN             | Filters access to the CreateGrant operation based on the value of SourceArn constraint in the request                                                                                                                                                     |
| `kms:GrantConstraintType`                       | string          | Filters access to the CreateGrant operation based on the grant constraint in the request                                                                                                                                                                  |
| `kms:GrantIsForAWSResource`                     | true / false    | Filters access to the CreateGrant operation when the request comes from a specified AWS service                                                                                                                                                           |
| `kms:GrantOperations`                           | list of strings | Filters access to the CreateGrant operation based on the operations in the grant                                                                                                                                                                          |
| `kms:GranteePrincipal`                          | string          | Filters access to the CreateGrant operation based on the grantee principal in the grant                                                                                                                                                                   |
| `kms:GranteeServicePrincipal`                   | string          | Filters access to the CreateGrant operation based on the value of GranteeServicePrincipal in the request                                                                                                                                                  |
| `kms:KeyAgreementAlgorithm`                     | string          | Filters access to the DeriveSharedSecret operation based on the value of the KeyAgreementAlgorithm parameter in the request                                                                                                                               |
| `kms:KeyOrigin`                                 | string          | Filters access to an API operation based on the Origin property of the AWS KMS key created by or used in the operation. Use it to qualify authorization of the CreateKey operation or any operation that is authorized for a KMS key                      |
| `kms:KeySpec`                                   | string          | Filters access to an API operation based on the KeySpec property of the AWS KMS key that is created by or used in the operation. Use it to qualify authorization of the CreateKey operation or any operation that is authorized for a KMS key resource    |
| `kms:KeyUsage`                                  | string          | Filters access to an API operation based on the KeyUsage property of the AWS KMS key created by or used in the operation. Use it to qualify authorization of the CreateKey operation or any operation that is authorized for a KMS key resource           |
| `kms:MacAlgorithm`                              | string          | Filters access to the GenerateMac and VerifyMac operations based on the MacAlgorithm parameter in the request                                                                                                                                             |
| `kms:MessageType`                               | string          | Filters access to the Sign and Verify operations based on the value of the MessageType parameter in the request                                                                                                                                           |
| `kms:MultiRegion`                               | true / false    | Filters access to an API operation based on the MultiRegi on property of the AWS KMS key created by or used in the operation. Use it to qualify authorization of the CreateKey operation or any operation that is authorized for a KMS key resource       |
| `kms:MultiRegionKeyType`                        | string          | Filters access to an API operation based on the MultiRegionKeyType property of the AWS KMS key created by or used in the operation. Use it to qualify authorization of the CreateKey operation or any operation that is authorized for a KMS key resource |
| `kms:PrimaryRegion`                             | string          | Filters access to the UpdatePrimaryRegion operation based on the value of the PrimaryRegion parameter in the request                                                                                                                                      |
| `kms:ReEncryptOnSameKey`                        | true / false    | Filters access to the ReEncrypt operation when it uses the same AWS KMS key that was used for the Encrypt operation                                                                                                                                       |
| `kms:RecipientAttestation:ImageSha384`          | string          | Filters access to the API operations based on the image hash in the attestation document in the request                                                                                                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR0`         | string          | Filters access by the platform configuration register (PCR) 0 in the attestation document in the request. PCR0 is a contiguous measure of core system firmware executable code                                                                            |
| `kms:RecipientAttestation:NitroTPMPCR1`         | string          | Filters access by the platform configuration register (PCR) 1 in the attestation document in the request. PCR1 is a contiguous measure of core system firmware data/ host platform configuration, typically including serial and model numbers            |
| `kms:RecipientAttestation:NitroTPMPCR10`        | string          | Filters access by the platform configuration register (PCR) 10 in the attestation document in the request. PCR10 is a contiguous measure of protection of the IMA measurement log                                                                         |
| `kms:RecipientAttestation:NitroTPMPCR11`        | string          | Filters access by the platform configuration register (PCR) 11 in the attestation document in the request. PCR11 is a contiguous measure of all components of unified kernel images (UKIs)                                                                |
| `kms:RecipientAttestation:NitroTPMPCR12`        | string          | Filters access by the platform configuration register (PCR) 12 in the attestation document in the request. PCR12 is a contiguous measure of kernel command line, system credentials and system configuration images                                       |
| `kms:RecipientAttestation:NitroTPMPCR13`        | string          | Filters access by the platform configuration register (PCR) 13 in the attestation document in the request. PCR13 is a contiguous measure of all system extension images for the initrd                                                                    |
| `kms:RecipientAttestation:NitroTPMPCR14`        | string          | Filters access by the platform configuration register (PCR) 14 in the attestation document in the request. PCR14 is a contiguous measure of "MOK" certificates and hashes                                                                                 |
| `kms:RecipientAttestation:NitroTPMPCR15`        | string          | Filters access by the platform configuration register (PCR) 15 in the attestation document in the request. PCR15 is a contiguous measure of root file system volume encryption key                                                                        |
| `kms:RecipientAttestation:NitroTPMPCR16`        | string          | Filters access by the platform configuration register (PCR) 16 in the attestation document in the request. PCR16 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR17`        | string          | Filters access by the platform configuration register (PCR) 17 in the attestation document in the request. PCR17 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR18`        | string          | Filters access by the platform configuration register (PCR) 18 in the attestation document in the request. PCR18 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR19`        | string          | Filters access by the platform configuration register (PCR) 19 in the attestation document in the request. PCR19 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR2`         | string          | Filters access by the platform configuration register (PCR) 2 in the attestation document in the request. PCR2 is a contiguous measure of extended or pluggable executable code, including option ROMs on pluggable hardware                              |
| `kms:RecipientAttestation:NitroTPMPCR20`        | string          | Filters access by the platform configuration register (PCR) 20 in the attestation document in the request. PCR20 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR21`        | string          | Filters access by the platform configuration register (PCR) 21 in the attestation document in the request. PCR21 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR22`        | string          | Filters access by the platform configuration register (PCR) 22 in the attestation document in the request. PCR22 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR23`        | string          | Filters access by the platform configuration register (PCR) 23 in the attestation document in the request. PCR23 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:NitroTPMPCR3`         | string          | Filters access by the platform configuration register (PCR) 3 in the attestation document in the request. PCR3 is a contiguous measure of extended or pluggable firmware data, including information about pluggable hardware                             |
| `kms:RecipientAttestation:NitroTPMPCR4`         | string          | Filters access by the platform configuration register (PCR) 4 in the attestation document in the request. PCR4 is a contiguous measure of boot loader and additional drivers, including binaries and extensions loaded by the boot loader                 |
| `kms:RecipientAttestation:NitroTPMPCR5`         | string          | Filters access by the platform configuration register (PCR) 5 in the attestation document in the request. PCR5 is a contiguous measure of GPT/Partition table                                                                                             |
| `kms:RecipientAttestation:NitroTPMPCR6`         | string          | Filters access by the platform configuration register (PCR) 6 in the attestation document in the request. PCR6 is a custom PCR that can be defined by the user for specific use cases                                                                     |
| `kms:RecipientAttestation:NitroTPMPCR7`         | string          | Filters access by the platform configuration register (PCR) 7 in the attestation document in the request. PCR7 is a contiguous measure of SecureBoot state                                                                                                |
| `kms:RecipientAttestation:NitroTPMPCR8`         | string          | Filters access by the platform configuration register (PCR) 8 in the attestation document in the request. PCR8 is a contiguous measure of commands and kernel command line                                                                                |
| `kms:RecipientAttestation:NitroTPMPCR9`         | string          | Filters access by the platform configuration register (PCR) 9 in the attestation document in the request. PCR9 is a contiguous measure of all files read (including kernel image)                                                                         |
| `kms:RecipientAttestation:PCR0`                 | string          | Filters access by the platform configuration register (PCR) 0 in the attestation document in the request. PCR0 is a contiguous measure of the contents of the enclave image file, without the section data                                                |
| `kms:RecipientAttestation:PCR1`                 | string          | Filters access by the platform configuration register (PCR) 1 in the attestation document in the request. PCR1 is a contiguous measurement of the Linux kernel and bootstrap data                                                                         |
| `kms:RecipientAttestation:PCR10`                | string          | Filters access by the platform configuration register (PCR) 10 in the attestation document in the request. PCR10 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR11`                | string          | Filters access by the platform configuration register (PCR) 11 in the attestation document in the request. PCR11 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR12`                | string          | Filters access by the platform configuration register (PCR) 12 in the attestation document in the request. PCR12 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR13`                | string          | Filters access by the platform configuration register (PCR) 13 in the attestation document in the request. PCR13 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR14`                | string          | Filters access by the platform configuration register (PCR) 14 in the attestation document in the request. PCR14 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR15`                | string          | Filters access by the platform configuration register (PCR) 15 in the attestation document in the request. PCR15 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR16`                | string          | Filters access by the platform configuration register (PCR) 16 in the attestation document in the request. PCR16 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR17`                | string          | Filters access by the platform configuration register (PCR) 17 in the attestation document in the request. PCR17 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR18`                | string          | Filters access by the platform configuration register (PCR) 18 in the attestation document in the request. PCR18 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR19`                | string          | Filters access by the platform configuration register (PCR) 19 in the attestation document in the request. PCR19 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR2`                 | string          | Filters access by the platform configuration register (PCR) 2 in the attestation document in the request. PCR2 is a contiguous, in-order measurement of the user applications, without the boot ramfs                                                     |
| `kms:RecipientAttestation:PCR20`                | string          | Filters access by the platform configuration register (PCR) 20 in the attestation document in the request. PCR20 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR21`                | string          | Filters access by the platform configuration register (PCR) 21 in the attestation document in the request. PCR21 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR22`                | string          | Filters access by the platform configuration register (PCR) 22 in the attestation document in the request. PCR22 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR23`                | string          | Filters access by the platform configuration register (PCR) 23 in the attestation document in the request. PCR23 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR24`                | string          | Filters access by the platform configuration register (PCR) 24 in the attestation document in the request. PCR24 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR25`                | string          | Filters access by the platform configuration register (PCR) 25 in the attestation document in the request. PCR25 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR26`                | string          | Filters access by the platform configuration register (PCR) 26 in the attestation document in the request. PCR26 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR27`                | string          | Filters access by the platform configuration register (PCR) 27 in the attestation document in the request. PCR27 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR28`                | string          | Filters access by the platform configuration register (PCR) 28 in the attestation document in the request. PCR28 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR29`                | string          | Filters access by the platform configuration register (PCR) 29 in the attestation document in the request. PCR29 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR3`                 | string          | Filters access by the platform configuration register (PCR) 3 in the attestation document in the request. PCR3 is a contiguous measurement of the IAM role assigned to the parent instance                                                                |
| `kms:RecipientAttestation:PCR30`                | string          | Filters access by the platform configuration register (PCR) 30 in the attestation document in the request. PCR30 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR31`                | string          | Filters access by the platform configuration register (PCR) 31 in the attestation document in the request. PCR31 is a custom PCR that can be defined by the user for specific use cases                                                                   |
| `kms:RecipientAttestation:PCR4`                 | string          | Filters access by the platform configuration register (PCR) 4 in the attestation document in the request. PCR4 is a contiguous measurement of the ID of the parent instance                                                                               |
| `kms:RecipientAttestation:PCR5`                 | string          | Filters access by the platform configuration register (PCR) 5 in the attestation document in the request. PCR5 is a custom PCR that can be defined by the user for specific use cases                                                                     |
| `kms:RecipientAttestation:PCR6`                 | string          | Filters access by the platform configuration register (PCR) 6 in the attestation document in the request. PCR6 is a custom PCR that can be defined by the user for specific use cases                                                                     |
| `kms:RecipientAttestation:PCR7`                 | string          | Filters access by the platform configuration register (PCR) 7 in the attestation document in the request. PCR7 is a custom PCR that can be defined by the user for specific use cases                                                                     |
| `kms:RecipientAttestation:PCR8`                 | string          | Filters access by the platform configuration register (PCR) 8 in the attestation document in the request. PCR8 is a measure of the signing certificate specified for the enclave image file                                                               |
| `kms:RecipientAttestation:PCR9`                 | string          | Filters access by the platform configuration register (PCR) 9 in the attestation document in the request. PCR9 is a custom PCR that can be defined by the user for specific use cases                                                                     |
| `kms:ReplicaRegion`                             | string          | Filters access to the ReplicateKey operation based on the value of the ReplicaRegion parameter in the request                                                                                                                                             |
| `kms:RequestAlias`                              | string          | Filters access to cryptographic operations, DescribeKey, and GetPublicKey based on the alias in the request                                                                                                                                               |
| `kms:ResourceAliases`                           | list of strings | Filters access to specified AWS KMS operations based on aliases associated with the AWS KMS key                                                                                                                                                           |
| `kms:RetiringPrincipal`                         | string          | Filters access to the CreateGrant operation based on the retiring principal in the grant                                                                                                                                                                  |
| `kms:RetiringServicePrincipal`                  | string          | Filters access to the CreateGrant operation based on the value of RetiringServicePrincipal in the request                                                                                                                                                 |
| `kms:RotationPeriodInDays`                      | number          | Filters access to the EnableKeyRotation operation based on the value of the RotationPeriodInDays parameter in the request                                                                                                                                 |
| `kms:ScheduleKeyDeletionPendingWindowInDays`    | number          | Filters access to the ScheduleKeyDeletion operation based on the value of the PendingWindowInDays parameter in the request                                                                                                                                |
| `kms:SigningAlgorithm`                          | string          | Filters access to the Sign and Verify operations based on the signing algorithm in the request                                                                                                                                                            |
| `kms:TrailingDaysWithoutKeyUsage`               | number          | Filters access to the ScheduleKeyDeletion and DisableKe y operations based on the number of days since the AWS KMS key was last used                                                                                                                      |
| `kms:ValidTo`                                   | ISO 8601 date   | Filters access to the ImportKeyMaterial operation based on the value of the ValidTo parameter in the request. You can use this condition key to allow users to import key material only when it expires by the specified date                             |
| `kms:ViaService`                                | string          | Filters access when a request made on the principal's behalf comes from a specified AWS service                                                                                                                                                           |
| `kms:WrappingAlgorithm`                         | string          | Filters access to the GetParametersForImport operation based on the value of the WrappingAlgorithm parameter in the request                                                                                                                               |
| `kms:WrappingKeySpec`                           | string          | Filters access to the GetParametersForImport operation based on the value of the WrappingKeySpec parameter in the request                                                                                                                                 |

### lakeformation

| Key                                          | Value        | Description                                                                           |
| -------------------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `lakeformation:EnabledOnlyForMetaDataAccess` | true / false | Filters access by the presence of the key configured for role's identity-based policy |

### lambda

| Key                            | Value           | Description                                                                                                                                                                                                                                         |
| ------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lambda:CodeSigningConfigArn`  | ARN             | —                                                                                                                                                                                                                                                   |
| `lambda:EventSourceToken`      | string          | Filters access by the ID from a non-AWS event source configured for the AWS Lambda function                                                                                                                                                         |
| `lambda:FunctionArn`           | ARN             | Filters access by the ARN of an AWS Lambda function                                                                                                                                                                                                 |
| `lambda:FunctionUrlAuthType`   | string          | Filters access by authorization type specified in request. Available during CreateFunctionUrlConfig, UpdateFun ctionUrlConfig, DeleteFunctionUrlConfig, GetFuncti onUrlConfig, ListFunctionUrlConfig, AddPermission and RemovePermission operations |
| `lambda:InvokedViaFunctionUrl` | true / false    | Limits the scope of lambda:InvokeFunction action to Function URLs only. Available during AddPermission operation                                                                                                                                    |
| `lambda:Layer`                 | list of strings | Filters access by the ARN of a version of an AWS Lambda layer                                                                                                                                                                                       |
| `lambda:Principal`             | string          | Filters access by restricting the AWS service or account that can invoke a function                                                                                                                                                                 |
| `lambda:SecurityGroupIds`      | list of strings | Filters access by the ID of security groups configured for the AWS Lambda function                                                                                                                                                                  |
| `lambda:SourceFunctionArn`     | ARN             | Filters access by the ARN of the AWS Lambda function from which the request originated                                                                                                                                                              |
| `lambda:SubnetIds`             | list of strings | Filters access by the ID of subnets configured for the AWS Lambda function                                                                                                                                                                          |
| `lambda:VpcIds`                | string          | Filters access by the ID of the VPC configured for the AWS Lambda function                                                                                                                                                                          |

### lex

| Key                       | Value           | Description                                                                     |
| ------------------------- | --------------- | ------------------------------------------------------------------------------- |
| `lex:associatedIntents`   | list of strings | Enables you to control access based on the intents included in the request      |
| `lex:associatedSlotTypes` | list of strings | Enables you to control access based on the slot types included in the request   |
| `lex:channelType`         | string          | Enables you to control access based on the channel type included in the request |

### license-manager

| Key                                     | Value  | Description                                                        |
| --------------------------------------- | ------ | ------------------------------------------------------------------ |
| `license-manager:ResourceTag/${TagKey}` | string | Filters access by the tag key-value pairs attached to the resource |

### logs

| Key                                   | Value        | Description                                                              |
| ------------------------------------- | ------------ | ------------------------------------------------------------------------ |
| `logs:DeliveryDestinationResourceArn` | ARN          | Filters access by the Log Destination ARN passed in the request          |
| `logs:LogGeneratingResourceArns`      | list of ARNs | Filters access by the Log Generating Resource ARNs passed in the request |
| `logs:data_source_name`               | string       | Filters access by the data source name passed in the request             |
| `logs:data_source_type`               | string       | Filters access by the data source type passed in the request             |

### lookoutequipment

| Key                                | Value        | Description                                              |
| ---------------------------------- | ------------ | -------------------------------------------------------- |
| `lookoutequipment:IsImportingData` | true / false | Filters access by the import strategy of underlying data |

### mediaconvert

| Key                               | Value        | Description                                                    |
| --------------------------------- | ------------ | -------------------------------------------------------------- |
| `mediaconvert:HttpInputsAllowed`  | true / false | Filters access by an HTTP input policy present in the account  |
| `mediaconvert:HttpsInputsAllowed` | true / false | Filters access by an HTTPS input policy present in the account |
| `mediaconvert:S3InputsAllowed`    | true / false | Filters access by an S3 input policy present in the account    |

### medical-imaging

| Key                                 | Value  | Description                                                      |
| ----------------------------------- | ------ | ---------------------------------------------------------------- |
| `medical-imaging:SeriesInstanceUID` | string | Filters access by the SeriesInstanceUID parameter in the request |
| `medical-imaging:StudyInstanceUID`  | string | Filters access by the StudyInstanceUID parameter in the request  |

### memorydb

| Key                               | Value        | Description                                                                                                             |
| --------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `memorydb:TLSEnabled`             | true / false | Filters access by the TLSEnabled parameter present in the request or defaults to true value if parameter is not present |
| `memorydb:UserAuthenticationMode` | string       | Filters access by the UserAuthenticationMode.Type parameter in the request                                              |

### mgh

| Key                                           | Value  | Description                                                  |
| --------------------------------------------- | ------ | ------------------------------------------------------------ |
| `mgh:AutomationRunResourceRunID`              | string | AutomationRunResource resource runID identifier              |
| `mgh:AutomationUnitResourceAutomationUnitArn` | ARN    | AutomationUnitResource resource automationUnitArn identifier |
| `mgh:ConnectionResourceConnectionArn`         | string | ConnectionResource resource connectionArn identifier         |

### mgn

| Key                | Value  | Description                                                  |
| ------------------ | ------ | ------------------------------------------------------------ |
| `mgn:CreateAction` | string | Filters access by the name of a resource-creating API action |

### mpa

| Key                            | Value  | Description                                                                                                     |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------- |
| `mpa:ProtectedResourceAccount` | string | Filters access by the account that owns the resource that is the target of the operation that requires approval |
| `mpa:RequestedOperation`       | string | Filters access by a requested operation that requires team approval before it can be executed                   |

### neptune-db

| Key                        | Value  | Description                   |
| -------------------------- | ------ | ----------------------------- |
| `neptune-db:QueryLanguage` | string | Filters access by graph model |

### neptune-graph

| Key                                | Value        | Description                                                                                                                                                              |
| ---------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `neptune-graph:PublicConnectivity` | true / false | Filters access by the value of the public connectivity parameter provided in the request or its default value, if unspecified. All access to graphs is IAM authenticated |

### networkmanager

| Key                                      | Value           | Description                                                                                             |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| `networkmanager:cgwArn`                  | ARN             | Filters access by which customer gateways can be associated or disassociated                            |
| `networkmanager:directConnectGatewayArn` | ARN             | Filters access by which Direct Connect gateway can be used to a create/update attachment                |
| `networkmanager:edgeLocations`           | list of strings | Filters access by which edge locations can be added or removed from a Direct Connect gateway attachment |
| `networkmanager:subnetArns`              | list of ARNs    | Filters access by which VPC subnets can be added or removed from a VPC attachment                       |
| `networkmanager:tgwArn`                  | ARN             | Filters access by which transit gateways can be registere d, deregistered, or peered                    |
| `networkmanager:tgwConnectPeerArn`       | ARN             | Filters access by which transit gateway connect peers can be associated or disassociated                |
| `networkmanager:tgwRtbArn`               | ARN             | Filters access by which Transit Gateway Route Table can be used to create an attachment                 |
| `networkmanager:vpcArn`                  | ARN             | Filters access by which VPC can be used to a create/up date attachment                                  |
| `networkmanager:vpnConnectionArn`        | ARN             | Filters access by which Site-to-Site VPN can be used to a create/update attachment                      |

### nimble

| Key                           | Value  | Description                                                                                |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------------ |
| `nimble:createdBy`            | string | Filters access by the createdBy request parameter or the ID of the creator of the resource |
| `nimble:ownedBy`              | string | Filters access by the ownedBy request parameter or the ID of the owner of the resource     |
| `nimble:principalId`          | string | Filters access by the principalId request parameter                                        |
| `nimble:requesterPrincipalId` | string | Filters access by the ID of the logged in user                                             |
| `nimble:studioId`             | ARN    | Filters access by a specific studio                                                        |

### oam

| Key                 | Value           | Description                                                     |
| ------------------- | --------------- | --------------------------------------------------------------- |
| `oam:ResourceTypes` | list of strings | Filters access by the presence of resource types in the request |

### observabilityadmin

| Key                                                   | Value           | Description                                                                                                  |
| ----------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| `observabilityadmin:CentralizationBackupRegion`       | string          | Filters access by the backup region that is passed in the request                                            |
| `observabilityadmin:CentralizationDestinationAccount` | string          | Filters access by the destination account that is passed in the request                                      |
| `observabilityadmin:CentralizationDestinationRegion`  | string          | Filters access by the destination region that is passed in the request                                       |
| `observabilityadmin:CentralizationRuleName`           | string          | Filters access by the name of the centralization rule that is passed in the request                          |
| `observabilityadmin:CentralizationSourceId`           | list of strings | Filters access by the source account, organizational unit, or organization IDs that is passed in the request |
| `observabilityadmin:CentralizationSourceRegions`      | list of strings | Filters access by the source regions that are passed in the request                                          |
| `observabilityadmin:SourceType`                       | string          | Filters access by the source type that is passed in the request                                              |
| `observabilityadmin:TargetRegions`                    | string          | Filters access by the regions that are targetted by the request                                              |

### organizations

| Key                               | Value  | Description                                                              |
| --------------------------------- | ------ | ------------------------------------------------------------------------ |
| `organizations:PolicyType`        | string | Filters access by the specified policy type names                        |
| `organizations:ServicePrincipal`  | string | Filters access by the specified service principal names                  |
| `organizations:TransferDirection` | string | Filters access by the specified responsibility transfer by the direction |
| `organizations:TransferType`      | string | Filters access by the specified responsibility transfer type names       |

### partnercentral

| Key                                   | Value           | Description                                                |
| ------------------------------------- | --------------- | ---------------------------------------------------------- |
| `partnercentral:Catalog`              | string          | Filters access by a specific Catalog                       |
| `partnercentral:ChannelHandshakeType` | string          | Filters access by channel handshake types                  |
| `partnercentral:FulfillmentTypes`     | list of strings | —                                                          |
| `partnercentral:Programs`             | list of strings | Filters access by program                                  |
| `partnercentral:RelatedEntityType`    | string          | Filters access by entity types for Opportunity association |
| `partnercentral:VerificationType`     | string          | —                                                          |

### partnercentral-account-management

| Key                                                          | Value           | Description                                       |
| ------------------------------------------------------------ | --------------- | ------------------------------------------------- |
| `partnercentral-account-management:LegacyPartnerCentralRole` | list of strings | Filters access by the Legacy Partner Central role |
| `partnercentral-account-management:MarketingCentralRole`     | list of strings | Filters access by Marketing Central role          |
| `partnercentral-account-management:ProServeRole`             | list of strings | Filters access by ProServe Tools role             |

### payment-cryptography

| Key                                                            | Value           | Description                                                                                                                                                                                                                                |
| -------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `payment-cryptography:CertificateAuthorityPublicKeyIdentifier` | string          | —                                                                                                                                                                                                                                          |
| `payment-cryptography:ImportKeyMaterial`                       | string          | Filters access by the type of key material being imported [RootCertificatePublicKey, TrustedCertificatePublicKey , Tr34KeyBlock, Tr31KeyBlock, DiffieHellmanTr31K eyBlock, As2805KeyCryptogram, KeyCryptogram] for the ImportKey operation |
| `payment-cryptography:KeyAlgorithm`                            | string          | Filters access by KeyAlgorithm specified in the request for the CreateKey operation                                                                                                                                                        |
| `payment-cryptography:KeyClass`                                | string          | Filters access by KeyClass specified in the request for the CreateKey operation                                                                                                                                                            |
| `payment-cryptography:KeyUsage`                                | string          | Filters access by KeyClass specified in the request or associated with a key for the CreateKey operation                                                                                                                                   |
| `payment-cryptography:RequestAlias`                            | string          | Filters access by aliases in the request for the specified operation                                                                                                                                                                       |
| `payment-cryptography:ResourceAliases`                         | list of strings | Filters access by aliases associated with a key for the specified operation                                                                                                                                                                |
| `payment-cryptography:WrappingKeyIdentifier`                   | string          | —                                                                                                                                                                                                                                          |

### pi

| Key             | Value           | Description                                |
| --------------- | --------------- | ------------------------------------------ |
| `pi:Dimensions` | list of strings | Filters access by the requested dimensions |

### proton

| Key                          | Value  | Description                                                          |
| ---------------------------- | ------ | -------------------------------------------------------------------- |
| `proton:EnvironmentTemplate` | string | Filters access by specified environment template related to resource |
| `proton:ServiceTemplate`     | string | Filters access by specified service template related to resource     |

### q

| Key                     | Value           | Description                                    |
| ----------------------- | --------------- | ---------------------------------------------- |
| `identitystore:GroupId` | list of strings | Filters access by IAM Identity Center Group ID |
| `identitystore:UserId`  | list of strings | Filters access by IAM Identity Center User ID  |

### qapps

| Key                            | Value  | Description                                                    |
| ------------------------------ | ------ | -------------------------------------------------------------- |
| `qapps:AppIsPublished`         | string | Filters access by whether Q App is published                   |
| `qapps:SessionIsShared`        | string | Filters access by whether Q App Session is shared              |
| `qapps:UserIsAppOwner`         | string | Filters access by whether requester is Q App owner             |
| `qapps:UserIsSessionModerator` | string | Filters access by whether requester is Q App Session moderator |

### qbusiness

| Key                     | Value           | Description                                    |
| ----------------------- | --------------- | ---------------------------------------------- |
| `identitystore:GroupId` | list of strings | Filters access by IAM Identity Center Group ID |
| `identitystore:UserId`  | list of strings | Filters access by IAM Identity Center User ID  |

### qldb

| Key          | Value  | Description                                                                        |
| ------------ | ------ | ---------------------------------------------------------------------------------- |
| `qldb:Purge` | string | Filters access by the value of purge that is specified in a PartiQL DROP statement |

### quicksight

| Key                                  | Value           | Description                                     |
| ------------------------------------ | --------------- | ----------------------------------------------- |
| `quicksight:AllowedEmbeddingDomains` | list of strings | Filters access by the allowed embedding domains |
| `quicksight:DirectoryType`           | string          | Filters access by the user management options   |
| `quicksight:Edition`                 | string          | Filters access by the edition of QuickSight     |
| `quicksight:Group`                   | ARN             | Filters access by QuickSight group ARN          |
| `quicksight:IamArn`                  | ARN             | Filters access by IAM user or role ARN          |
| `quicksight:KmsKeyArns`              | list of ARNs    | Filters access by KMS key ARNs                  |
| `quicksight:SessionName`             | string          | Filters access by session name                  |
| `quicksight:UserName`                | string          | Filters access by user name                     |

### ram

| Key                                           | Value        | Description                                                                                                                                                                                                                                                                                        |
| --------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ram:AllowsExternalPrincipals`                | true / false | Filters access by resource shares that allow or deny sharing with external principals. For example, specify true if the action can only be performed on resource shares that allow sharing with external principals. External principals are AWS accounts that are outside of its AWS organization |
| `ram:PermissionArn`                           | ARN          | Filters access by the specified Permission ARN                                                                                                                                                                                                                                                     |
| `ram:PermissionResourceType`                  | string       | Filters access by permissions of specified resource type                                                                                                                                                                                                                                           |
| `ram:Principal`                               | string       | Filters access by format of the specified principal                                                                                                                                                                                                                                                |
| `ram:RequestedAllowsExternalPrincipals`       | true / false | Filters access by the specified value for 'allowExt ernalPrincipals'. External principals are AWS accounts that are outside of its AWS Organization                                                                                                                                                |
| `ram:RequestedResourceType`                   | string       | Filters access by the specified resource type                                                                                                                                                                                                                                                      |
| `ram:ResourceArn`                             | ARN          | Filters access by the specified ARN                                                                                                                                                                                                                                                                |
| `ram:ResourceShareName`                       | string       | Filters access by a resource share with the specified name                                                                                                                                                                                                                                         |
| `ram:ResourceTag/${TagKey}`                   | string       | Filters access by the tags associated with the resource                                                                                                                                                                                                                                            |
| `ram:RetainSharingOnAccountLeaveOrganization` | true / false | Filters access by RetainSharingOnAccountLeave Organization value within ResourceShareConfiguration that is set on resource share                                                                                                                                                                   |
| `ram:ShareOwnerAccountId`                     | string       | Filters access by resource shares owned by a specific account. For example, you can use this condition key to specify which resource share invitations can be accepted or rejected based on the resource share owner's account ID                                                                  |

### rbin

| Key                           | Value  | Description                                              |
| ----------------------------- | ------ | -------------------------------------------------------- |
| `rbin:Attribute/ResourceType` | string | Filters access by the resource type of the existing rule |
| `rbin:Request/ResourceType`   | string | Filters access by the resource type in a request         |

### rds

| Key                                  | Value        | Description                                                                                                                                                                                                                                                                           |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rds:BackupTarget`                   | string       | Filters access by the type of backup target. One of: region, outposts                                                                                                                                                                                                                 |
| `rds:CopyOptionGroup`                | true / false | Filters access by the value that specifies whether the CopyDBSnapshot action requires copying the DB option group                                                                                                                                                                     |
| `rds:DatabaseClass`                  | string       | Filters access by the type of DB instance class                                                                                                                                                                                                                                       |
| `rds:DatabaseEngine`                 | string       | Filters access by the database engine. For possible values refer to the engine parameter in CreateDBI nstance API                                                                                                                                                                     |
| `rds:DatabaseName`                   | string       | Filters access by the user-defined name of the database on the DB instance                                                                                                                                                                                                            |
| `rds:EndpointType`                   | string       | Filters access by the type of the endpoint. One of: READER, WRITER, CUSTOM                                                                                                                                                                                                            |
| `rds:ManageMasterUserPassword`       | true / false | Filters access by the value that specifies whether RDS manages master user password in AWS Secrets Manager for the DB instance or cluster                                                                                                                                             |
| `rds:MultiAz`                        | true / false | Filters access by the value that specifies whether the DB instance runs in multiple Availability Zones. To indicate that the DB instance is using Multi-AZ, specify true                                                                                                              |
| `rds:Piops`                          | number       | Filters access by the value that contains the number of Provisioned IOPS (PIOPS) that the instance supports. To indicate a DB instance that does not have PIOPS enabled, specify 0                                                                                                    |
| `rds:PubliclyAccessible`             | true / false | Filters access by the value that specifies whether the DB Instance or DB ShardGroup is publicly accessible                                                                                                                                                                            |
| `rds:StorageEncrypted`               | true / false | Filters access by the value that specifies whether the DB instance storage should be encrypted. To enforce storage encryption, specify true                                                                                                                                           |
| `rds:StorageSize`                    | number       | Filters access by the storage volume size (in GB)                                                                                                                                                                                                                                     |
| `rds:TagsFromRequest`                | true / false | Filters access for rds:AddTagsToResource based on whether tags are explicitly specified in the Tags or TagSpecification request parameters. Evaluates to true when tags are provided in these parameters. Evaluates as false when tags are implicitly inherited from source resources |
| `rds:TenantDatabaseName`             | string       | Filters access by the tenant database name in CreateTen antDatabase and by the new tenant database name in ModifyTenantDatabase                                                                                                                                                       |
| `rds:Vpc`                            | true / false | Filters access by the value that specifies whether the DB instance runs in an Amazon Virtual Private Cloud (Amazon VPC). To indicate that the DB instance runs in an Amazon VPC, specify true                                                                                         |
| `rds:cluster-pg-tag/${TagKey}`       | string       | Filters access by the tag attached to a DB cluster parameter group                                                                                                                                                                                                                    |
| `rds:cluster-snapshot-tag/${TagKey}` | string       | Filters access by the tag attached to a DB cluster snapshot                                                                                                                                                                                                                           |
| `rds:cluster-tag/${TagKey}`          | string       | Filters access by the tag attached to a DB cluster                                                                                                                                                                                                                                    |
| `rds:db-tag/${TagKey}`               | string       | Filters access by the tag attached to a DB instance                                                                                                                                                                                                                                   |
| `rds:es-tag/${TagKey}`               | string       | Filters access by the tag attached to an event subscription                                                                                                                                                                                                                           |
| `rds:og-tag/${TagKey}`               | string       | Filters access by the tag attached to a DB option group                                                                                                                                                                                                                               |
| `rds:pg-tag/${TagKey}`               | string       | Filters access by the tag attached to a DB parameter group                                                                                                                                                                                                                            |
| `rds:req-tag/${TagKey}`              | string       | Filters access by the set of tag keys and values that can be used to tag a resource                                                                                                                                                                                                   |
| `rds:ri-tag/${TagKey}`               | string       | Filters access by the tag attached to a reserved DB instance                                                                                                                                                                                                                          |
| `rds:secgrp-tag/${TagKey}`           | string       | Filters access by the tag attached to a DB security group                                                                                                                                                                                                                             |
| `rds:snapshot-tag/${TagKey}`         | string       | Filters access by the tag attached to a DB snapshot                                                                                                                                                                                                                                   |
| `rds:subgrp-tag/${TagKey}`           | string       | Filters access by the tag attached to a DB subnet group                                                                                                                                                                                                                               |

### redshift

| Key                              | Value        | Description                                                                      |
| -------------------------------- | ------------ | -------------------------------------------------------------------------------- |
| `redshift:AllowWrites`           | true / false | Filters access by the allowWrites input parameter                                |
| `redshift:ConsumerArn`           | ARN          | Filters access by the datashare consumer arn                                     |
| `redshift:ConsumerIdentifier`    | string       | —                                                                                |
| `redshift:DbName`                | string       | Filters access by the database name                                              |
| `redshift:DbUser`                | string       | Filters access by the database user name                                         |
| `redshift:DurationSeconds`       | string       | Filters access by the number of seconds until a temporary credential set expires |
| `redshift:InboundIntegrationArn` | ARN          | Filters access by the ARN of an inbound zero-ETL Integration resource            |
| `redshift:IntegrationSourceArn`  | ARN          | Filters access by the ARN of a zero-ETL Integration source                       |
| `redshift:IntegrationTargetArn`  | ARN          | Filters access by the ARN of a zero-ETL Integration target                       |

### redshift-data

| Key                                        | Value  | Description                                  |
| ------------------------------------------ | ------ | -------------------------------------------- |
| `redshift-data:glue-catalog-arn`           | ARN    | Filters access by glue catalog arn           |
| `redshift-data:session-owner-iam-userid`   | string | Filters access by session owner iam userid   |
| `redshift-data:statement-owner-iam-userid` | string | Filters access by statement owner iam userid |

### redshift-serverless

| Key                                         | Value  | Description                                            |
| ------------------------------------------- | ------ | ------------------------------------------------------ |
| `redshift-serverless:endpointAccessId`      | string | Filters access by the endpoint access identifier       |
| `redshift-serverless:managedWorkgroupName`  | string | Filters access by the managed workgroup identifier     |
| `redshift-serverless:namespaceId`           | string | Filters access by the namespace identifier             |
| `redshift-serverless:recoveryPointId`       | string | Filters access by the recovery point identifier        |
| `redshift-serverless:snapshotId`            | string | Filters access by the snapshot identifier              |
| `redshift-serverless:tableRestoreRequestId` | string | Filters access by the table restore request identifier |
| `redshift-serverless:workgroupId`           | string | Filters access by the workgroup identifier             |

### refactor-spaces

| Key                                           | Value           | Description                                                                                                        |
| --------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| `refactor-spaces:ApplicationCreatedByAccount` | string          | Filters access by restricting the action to only those accounts that created the application within an environment |
| `refactor-spaces:CreatedByAccountIds`         | list of strings | Filters access by the accounts that created the resource                                                           |
| `refactor-spaces:RouteCreatedByAccount`       | string          | Filters access by restricting the action to only those accounts that created the route within an application       |
| `refactor-spaces:ServiceCreatedByAccount`     | string          | Filters access by restricting the action to only those accounts that created the service within an application     |
| `refactor-spaces:SourcePath`                  | string          | Filters access by the path of the route                                                                            |

### resource-explorer-2

| Key                             | Value  | Description                                                                                           |
| ------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `resource-explorer-2:Operation` | string | Filters access by the actual operation that is being invoked, available values: Search, ListResources |

### route53

| Key                                                     | Value           | Description                                                                                            |
| ------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `route53:ChangeResourceRecordSetsActions`               | list of strings | Filters access by the change actions, CREATE, UPSERT, or DELETE, in a ChangeResourceRecordSets request |
| `route53:ChangeResourceRecordSetsNormalizedRecordNames` | list of strings | Filters access by the normalized DNS record names in a ChangeResourceRecordSets request                |
| `route53:ChangeResourceRecordSetsRecordTypes`           | list of strings | —                                                                                                      |
| `route53:VPCs`                                          | string          | Filters access by VPCs in request                                                                      |

### route53-recovery-cluster

| Key                                                  | Value        | Description |
| ---------------------------------------------------- | ------------ | ----------- |
| `route53-recovery-cluster:AllowSafetyRulesOverrides` | true / false | —           |

### route53profiles

| Key                                         | Value  | Description |
| ------------------------------------------- | ------ | ----------- |
| `route53profiles:FirewallRuleGroupPriority` | number | —           |
| `route53profiles:HostedZoneDomains`         | string | —           |
| `route53profiles:ResolverRuleDomains`       | string | —           |
| `route53profiles:ResourceArns`              | ARN    | —           |
| `route53profiles:ResourceIds`               | string | —           |
| `route53profiles:ResourceTypes`             | string | —           |

### rtbfabric

| Key                                      | Value  | Description                                                         |
| ---------------------------------------- | ------ | ------------------------------------------------------------------- |
| `rtbfabric:InboundExternalLinkGatewayId` | string | Filters access by gateway identifier supporting rtb-gw-* formats    |
| `rtbfabric:InboundExternalLinkLinkId`    | string | Filters access by InboundExternalLink resource linkId identifier    |
| `rtbfabric:LinkLinkId`                   | string | Filters access by Link resource linkId identifier                   |
| `rtbfabric:LinkRoutingRuleRuleId`        | string | Filters access by routing rule identifier supporting rule-* formats |
| `rtbfabric:OutboundExternalLinkLinkId`   | string | Filters access by OutboundExternalLink resource linkId identifier   |
| `rtbfabric:RequesterGatewayGatewayId`    | string | Filters access by gateway identifier supporting rtb-gw-* formats    |
| `rtbfabric:ResponderGatewayGatewayId`    | string | Filters access by gateway identifier supporting rtb-gw-* formats    |

### s3

| Key                                                  | Value           | Description                                                                                                                             |
| ---------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `s3:AccessGrantScope`                                | string          | Filters access by the grant scope of access grants grant                                                                                |
| `s3:AccessGrantsInstanceArn`                         | ARN             | Filters access by access grants instance ARN                                                                                            |
| `s3:AccessGrantsLocationScope`                       | string          | Filters access by the location scope of access grants location                                                                          |
| `s3:AccessPointNetworkOrigin`                        | string          | Filters access by the network origin (Internet or VPC)                                                                                  |
| `s3:AccessPointTag/${TagKey}`                        | string          | Filters access by existing access point tag key and value                                                                               |
| `s3:BucketTag/${TagKey}`                             | string          | Filters access by the tags associated with the bucket                                                                                   |
| `s3:DataAccessPointAccount`                          | string          | Filters access by the AWS Account ID that owns the access point                                                                         |
| `s3:DataAccessPointArn`                              | ARN             | Filters access by an access point Amazon Resource Name (ARN)                                                                            |
| `s3:ExistingJobOperation`                            | string          | Filters access by operation to updating the job priority                                                                                |
| `s3:ExistingJobPriority`                             | number          | Filters access by priority range to cancelling existing jobs                                                                            |
| `s3:ExistingObjectTag/<key>`                         | string          | Filters access by existing object tag key and value                                                                                     |
| `s3:InventoryAccessibleOptionalFields`               | list of strings | Filters access by restricting which optional metadata fields a user can add when configuring S3 Inventory reports                       |
| `s3:JobSuspendedCause`                               | string          | Filters access by a specific job suspended cause (for example, AWAITING_CONFIRMATION) to cancelling suspended jobs                      |
| `s3:ObjectCreationOperation`                         | true / false    | Filters access by whether or not the operation creates an object                                                                        |
| `s3:RequestJobOperation`                             | string          | Filters access by operation to creating jobs                                                                                            |
| `s3:RequestJobPriority`                              | number          | Filters access by priority range to creating new jobs                                                                                   |
| `s3:RequestObjectTag/<key>`                          | string          | Filters access by the tag keys and values to be added to objects                                                                        |
| `s3:RequestObjectTagKeys`                            | list of strings | Filters access by the tag keys to be added to objects                                                                                   |
| `s3:ResourceAccount`                                 | string          | Filters access by the resource owner AWS account ID                                                                                     |
| `s3:TlsVersion`                                      | number          | Filters access by the TLS version used by the client                                                                                    |
| `s3:annotation-prefix`                               | string          | Filters access by the annotation name prefix specified in the request                                                                   |
| `s3:authType`                                        | string          | Filters access by authentication method                                                                                                 |
| `s3:delimiter`                                       | string          | Filters access by delimiter parameter                                                                                                   |
| `s3:deliverySourceArn`                               | ARN             | Filters access by specific delivery source Amazon Resource Name (ARN)                                                                   |
| `s3:destinationRegion`                               | string          | Filters access by a specific replication destination region for targeted buckets of the AWS FIS action aws:s3:bu cket-pause-replication |
| `s3:if-match`                                        | string          | Filters access by the request's 'If-Match' conditional header                                                                           |
| `s3:if-none-match`                                   | string          | Filters access by the request's 'If-None-Match' condition al header                                                                     |
| `s3:isReplicationPauseRequest`                       | true / false    | Filters access by request made via AWS FIS action aws:s3:bucket-pause-replication                                                       |
| `s3:locationconstraint`                              | string          | Filters access by a specific Region                                                                                                     |
| `s3:logType`                                         | string          | Filters access by specific log type, currently supports S3_SERVER_ACCESS_LOGS                                                           |
| `s3:max-annotation-results`                          | number          | Filters access by the maximum number of annotation results requested                                                                    |
| `s3:max-keys`                                        | number          | Filters access by maximum number of keys returned in a ListBucket request                                                               |
| `s3:object-lock-legal-hold`                          | string          | Filters access by object legal hold status                                                                                              |
| `s3:object-lock-mode`                                | string          | Filters access by object retention mode (COMPLIANCE or GOVERNANCE)                                                                      |
| `s3:object-lock-remaining-retention-days`            | number          | Filters access by remaining object retention days                                                                                       |
| `s3:object-lock-retain-until-date`                   | ISO 8601 date   | Filters access by object retain-until date                                                                                              |
| `s3:prefix`                                          | string          | —                                                                                                                                       |
| `s3:resourceArnBeingAuthorized`                      | ARN             | Filters access by source bucket Amazon Resource Name (ARN)                                                                              |
| `s3:signatureAge`                                    | number          | Filters access by the age in milliseconds of the request signature                                                                      |
| `s3:signatureversion`                                | string          | Filters access by the version of AWS Signature used on the request                                                                      |
| `s3:versionid`                                       | string          | Filters access by a specific object version                                                                                             |
| `s3:x-amz-acl`                                       | string          | Filters access by canned ACL in the request's x-amz-acl header                                                                          |
| `s3:x-amz-bucket-namespace`                          | string          | Filters access by general purpose bucket namespace type                                                                                 |
| `s3:x-amz-content-sha256`                            | string          | Filters access by unsigned content in your bucket                                                                                       |
| `s3:x-amz-copy-source`                               | string          | Filters access by copy source bucket, prefix, or object in the copy object requests                                                     |
| `s3:x-amz-grant-full-control`                        | string          | Filters access by x-amz-grant-full-control (full control) header                                                                        |
| `s3:x-amz-grant-read`                                | string          | Filters access by x-amz-grant-read (read access) header                                                                                 |
| `s3:x-amz-grant-read-acp`                            | string          | Filters access by the x-amz-grant-read-acp (read permissions for the ACL) header                                                        |
| `s3:x-amz-grant-write`                               | string          | Filters access by the x-amz-grant-write (write access) header                                                                           |
| `s3:x-amz-grant-write-acp`                           | string          | Filters access by the x-amz-grant-write-acp (write permissions for the ACL) header                                                      |
| `s3:x-amz-metadata-directive`                        | string          | Filters access by object metadata behavior (COPY or REPLACE) when objects are copied                                                    |
| `s3:x-amz-object-annotation-directive`               | string          | Filters access by the annotation copy directive specified in the request                                                                |
| `s3:x-amz-object-if-match`                           | string          | Filters access by the ETag of the object version specified in the request                                                               |
| `s3:x-amz-object-ownership`                          | string          | Filters access by Object Ownership                                                                                                      |
| `s3:x-amz-server-side-encryption`                    | string          | Filters access by server-side encryption                                                                                                |
| `s3:x-amz-server-side-encryption-aws-kms-key-id`     | ARN             | Filters access by AWS KMS customer managed CMK for server-side encryption                                                               |
| `s3:x-amz-server-side-encryption-customer-algorithm` | string          | Filters access by customer specified algorithm for server- side encryption                                                              |
| `s3:x-amz-storage-class`                             | string          | Filters access by storage class                                                                                                         |
| `s3:x-amz-website-redirect-location`                 | string          | Filters access by a specific website redirect location for buckets that are configured as static websites                               |

### s3-object-lambda

| Key                             | Value  | Description                                                        |
| ------------------------------- | ------ | ------------------------------------------------------------------ |
| `s3-object-lambda:TlsVersion`   | number | Filters access by the TLS version used by the client               |
| `s3-object-lambda:authType`     | string | Filters access by authentication method                            |
| `s3-object-lambda:signatureAge` | number | Filters access by the age in milliseconds of the request signature |
| `s3-object-lambda:versionid`    | string | Filters access by a specific object version                        |

### s3-outposts

| Key                                        | Value  | Description                                                                                                              |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| `s3-outposts:AccessPointNetworkOrigin`     | string | Filters access by the network origin (Internet or VPC)                                                                   |
| `s3-outposts:DataAccessPointAccount`       | string | Filters access by the AWS Account ID that owns the access point                                                          |
| `s3-outposts:DataAccessPointArn`           | ARN    | Filters access by an access point Amazon Resource Name (ARN)                                                             |
| `s3-outposts:ExistingObjectTag/<key>`      | string | Filters access by requiring that an existing object tag has a specific tag key and value                                 |
| `s3-outposts:RequestObjectTag/<key>`       | string | —                                                                                                                        |
| `s3-outposts:RequestObjectTagKeys`         | string | Filters access by restricting the tag keys allowed on objects                                                            |
| `s3-outposts:authType`                     | string | Filters access by restricting incoming requests to a specific authentication method                                      |
| `s3-outposts:delimiter`                    | string | Filters access by requiring the delimiter parameter                                                                      |
| `s3-outposts:max-keys`                     | number | Filters access by limiting the maximum number of keys returned in a ListBucket request                                   |
| `s3-outposts:prefix`                       | string | —                                                                                                                        |
| `s3-outposts:signatureAge`                 | number | Filters access by identifying the length of time, in milliseconds, that a signature is valid in an authenticated request |
| `s3-outposts:signatureversion`             | string | Filters access by identifying the version of AWS Signature that is supported for authenticated requests                  |
| `s3-outposts:versionid`                    | string | Filters access by a specific object version                                                                              |
| `s3-outposts:x-amz-acl`                    | string | Filters access by requiring the x-amz-acl header with a specific canned ACL in a request                                 |
| `s3-outposts:x-amz-content-sha256`         | string | Filters access by disallowing unsigned content in your bucket                                                            |
| `s3-outposts:x-amz-copy-source`            | string | Filters access by restricting the copy source to a specific bucket, prefix, or object                                    |
| `s3-outposts:x-amz-metadata-directive`     | string | Filters access by enabling enforcement of object metadata behavior (COPY or REPLACE) when objects are copied             |
| `s3-outposts:x-amz-server-side-encryption` | string | Filters access by requiring server-side encryption                                                                       |
| `s3-outposts:x-amz-storage-class`          | string | Filters access by storage class                                                                                          |

### s3express

| Key                                                     | Value           | Description                                                                                                       |
| ------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `s3express:AccessPointNetworkOrigin`                    | string          | —                                                                                                                 |
| `s3express:AccessPointTag/${TagKey}`                    | string          | Filters access by tag key-value pairs attached to the access point                                                |
| `s3express:AllAccessRestrictedToLocalZoneGroup`         | string          | Filters access by AWS Local Zone network border group(s) provided in this condition key                           |
| `s3express:BucketTag/${TagKey}`                         | string          | Filters access by tag key-value pairs attached to the bucket                                                      |
| `s3express:DataAccessPointAccount`                      | string          | Filters access by the AWS Account ID that owns the access point                                                   |
| `s3express:DataAccessPointArn`                          | ARN             | Filters access by an access point Amazon Resource Name (ARN)                                                      |
| `s3express:InventoryAccessibleOptionalFields`           | list of strings | Filters access by restricting which optional metadata fields a user can add when configuring S3 Inventory reports |
| `s3express:LocationName`                                | string          | Filters access by a specific Availability Zone or Local Zone ID                                                   |
| `s3express:Permissions`                                 | list of strings | Filters access by the permission requested by Access Point Scope configuration, such as GetObject, PutObject      |
| `s3express:ResourceAccount`                             | string          | Filters access by the resource owner AWS account ID                                                               |
| `s3express:SessionMode`                                 | string          | Filters access by the permission requested by CreateSes sion API, such as ReadOnly and ReadWrite                  |
| `s3express:TlsVersion`                                  | number          | Filters access by the TLS version used by the client                                                              |
| `s3express:authType`                                    | string          | Filters access by authentication method                                                                           |
| `s3express:signatureAge`                                | number          | Filters access by the age in milliseconds of the request signature                                                |
| `s3express:signatureversion`                            | string          | Filters access by the AWS Signature Version used on the request                                                   |
| `s3express:x-amz-content-sha256`                        | string          | Filters access by unsigned content in your bucket                                                                 |
| `s3express:x-amz-server-side-encryption`                | string          | Filters access by server-side encryption                                                                          |
| `s3express:x-amz-server-side-encryption-aws-kms-key-id` | ARN             | Filters access by AWS KMS customer managed key for server-side encryption                                         |

### s3files

| Key                      | Value  | Description |
| ------------------------ | ------ | ----------- |
| `s3files:AccessPointArn` | ARN    | —           |
| `s3files:CreateAction`   | string | —           |

### s3tables

| Key                                 | Value  | Description                                                                        |
| ----------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `s3tables:KMSKeyArn`                | ARN    | Filters access by the AWS KMS key ARN for the key used to encrypt a table          |
| `s3tables:SSEAlgorithm`             | string | Filters access by the server-side encryption algorithm used to encrypt a table     |
| `s3tables:StorageClass`             | string | Filters access by the storage class that can be set on tables under a table bucket |
| `s3tables:TableBucketTag/${TagKey}` | string | Filters access by the tags associated with the table bucket                        |
| `s3tables:namespace`                | string | Filters access by the namespaces created in the table bucket                       |
| `s3tables:tableName`                | string | Filters access by the name of the tables in the table bucket                       |

### s3vectors

| Key                                   | Value  | Description                                                                       |
| ------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `s3vectors:VectorBucketTag/${TagKey}` | string | Filters access by the tags associated with the vector bucket                      |
| `s3vectors:kmsKeyArn`                 | ARN    | Filters access by the AWS KMS key ARN for the key used to encrypt a vector bucket |
| `s3vectors:sseType`                   | string | Filters access by server-side encryption type                                     |

### sagemaker

| Key                                                          | Value           | Description                                                                                                                                                                                             |
| ------------------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sagemaker:AcceleratorTypes`                                 | list of strings | Filters access by the list of all accelerator types associate d with the resource in the request                                                                                                        |
| `sagemaker:AppNetworkAccessType`                             | string          | Filters access by the app network access type associated with the resource in the request                                                                                                               |
| `sagemaker:AuthMode`                                         | string          | Filters access by the authentication mode specified in the request                                                                                                                                      |
| `sagemaker:BearerTokenType`                                  | string          | Filters access by the type of bearer token used in the request                                                                                                                                          |
| `sagemaker:CurrentCustomerMetadataProperties/${MetadataKey}` | string          | Filters access by a current metadata key and value pair associated with the model-package resource                                                                                                      |
| `sagemaker:CurrentModelLifeCycleStage`                       | string          | Filters access by the current value of the Stage field in the model life cycle object associated with the model- package resource                                                                       |
| `sagemaker:CurrentModelLifeCycleStageStatus`                 | string          | Filters access by the current value of the StageStatus field in the model life cycle object associated with the model-package resource                                                                  |
| `sagemaker:CustomerMetadataProperties/${MetadataKey}`        | string          | Filters access by a metadata key and value pair                                                                                                                                                         |
| `sagemaker:CustomerMetadataPropertiesToRemove`               | list of strings | Filters access by the list of metadata properties associated with the model-package resource in the request                                                                                             |
| `sagemaker:DirectGatedModelAccess`                           | string          | Used to deny direct access to SageMaker gated ModelReferences                                                                                                                                           |
| `sagemaker:DirectInternetAccess`                             | string          | Filters access by the direct internet access associated with the resource in the request                                                                                                                |
| `sagemaker:DomainId`                                         | string          | You can use the domainId as a policy variable to filter requests from specific SageMaker Domains                                                                                                        |
| `sagemaker:DomainSharingOutputKmsKey`                        | ARN             | Filters access by the Domain sharing output KMS key associated with the resource in the request. This key has been deprecated. It has been replaced by sagemaker :DomainSharingOutputKmsKeyArn          |
| `sagemaker:DomainSharingOutputKmsKeyArn`                     | ARN             | Filters access by the Domain sharing output KMS key associated with the resource in the request. The ARN of the key-id must be used                                                                     |
| `sagemaker:EnableRemoteDebug`                                | true / false    | Filters access by the remote debug config in the request                                                                                                                                                |
| `sagemaker:FeatureGroupDisableGlueTableCreation`             | true / false    | Filters access by the DisableGlueTableCreation flag associated with the feature group resource in the request                                                                                           |
| `sagemaker:FeatureGroupEnableOnlineStore`                    | true / false    | Filters access by the EnableOnlineStore flag associated with feature group in the request                                                                                                               |
| `sagemaker:FeatureGroupOfflineStoreConfig`                   | true / false    | —                                                                                                                                                                                                       |
| `sagemaker:FeatureGroupOfflineStoreKmsKey`                   | ARN             | —                                                                                                                                                                                                       |
| `sagemaker:FeatureGroupOfflineStoreKmsKeyArn`                | ARN             | —                                                                                                                                                                                                       |
| `sagemaker:FeatureGroupOfflineStoreS3Uri`                    | string          | —                                                                                                                                                                                                       |
| `sagemaker:FeatureGroupOnlineStoreKmsKey`                    | ARN             | Filters access by the online store kms key associated with the feature group resource in the request. This key has been deprecated. It has been replaced by sagemaker :FeatureGroupOnlineStoreKmsKeyArn |
| `sagemaker:FeatureGroupOnlineStoreKmsKeyArn`                 | ARN             | Filters access by the online store kms key associated with the feature group resource in the request. The of the key-id must be used                                                                    |
| `sagemaker:FileSystemAccessMode`                             | string          | Filters access by a file system access mode associated with the resource in the request                                                                                                                 |
| `sagemaker:FileSystemDirectoryPath`                          | string          | Filters access by a file system directory path associated with the resource in the request                                                                                                              |
| `sagemaker:FileSystemId`                                     | string          | Filters access by a file system ID associated with the resource in the request                                                                                                                          |
| `sagemaker:FileSystemType`                                   | string          | Filters access by a file system type associated with the resource in the request                                                                                                                        |
| `sagemaker:HomeEfsFileSystemKmsKey`                          | ARN             | Filters access by a key that is present in the request the user makes to the SageMaker service. This key has been deprecated. It has been replaced by sagemaker :VolumeKmsKeyArn                        |
| `sagemaker:ImageArns`                                        | list of ARNs    | Filters access by the list of all image arns associated with the resource in the request                                                                                                                |
| `sagemaker:ImageVersionArns`                                 | list of ARNs    | Filters access by the list of all image version arns associated with the resource in the request                                                                                                        |
| `sagemaker:InstanceTypes`                                    | list of strings | Filters access by the list of all instance types associated with the resource in the request                                                                                                            |
| `sagemaker:InterContainerTrafficEncryption`                  | true / false    | —                                                                                                                                                                                                       |
| `sagemaker:IsUpdateRecord`                                   | true / false    | Filters access by whether the PutRecord authorization was triggered by an UpdateRecord API call. Set to true on UpdateRecord and false on direct PutRecord calls                                        |
| `sagemaker:KeepAlivePeriod`                                  | number          | Filters access by the keep-alive period associated with the resource in the request                                                                                                                     |
| `sagemaker:MaxRuntimeInSeconds`                              | number          | Filters access by the max runtime in seconds associated with the resource in the request                                                                                                                |
| `sagemaker:MinimumInstanceMetadataServiceVersion`            | string          | Filters access by the minimum instance metadata service version used by the resource in the request                                                                                                     |
| `sagemaker:ModelApprovalStatus`                              | string          | Filters access by the model approval status with the model-package in the request                                                                                                                       |
| `sagemaker:ModelArn`                                         | ARN             | Filters access by the model arn associated with the resource in the request                                                                                                                             |
| `sagemaker:ModelLifeCycle:Stage`                             | string          | Filters access by stage field in the model life cycle object associated with the model-package resource in the request                                                                                  |
| `sagemaker:ModelLifeCycle:StageStatus`                       | string          | Filters access by stageStatus field in the model life cycle object associated with the model-package resource in the request                                                                            |
| `sagemaker:NetworkIsolation`                                 | true / false    | Filters access by the network isolation associated with the resource in the request                                                                                                                     |
| `sagemaker:NotebookInstanceLifecycleConfigArns`              | list of ARNs    | —                                                                                                                                                                                                       |
| `sagemaker:OutputKmsKey`                                     | ARN             | Filters access by the output kms key associated with the resource in the request. This key has been deprecated. It has been replaced by sagemaker:OutputKmsKeyArn                                       |
| `sagemaker:OutputKmsKeyArn`                                  | ARN             | Filters access by the output kms key associated with the resource in the request. The ARN of the key-id must be used                                                                                    |
| `sagemaker:OwnerUserProfileArn`                              | ARN             | —                                                                                                                                                                                                       |
| `sagemaker:PipelineVersionId`                                | string          | Filters access to specific version IDs of a Sagemaker pipeline                                                                                                                                          |
| `sagemaker:RemoteAccess`                                     | string          | Filters access by the remote access flag associated with the space in the request                                                                                                                       |
| `sagemaker:ResourceTag/`                                     | string          | Filters access by the preface string for a tag key and value pair attached to a resource                                                                                                                |
| `sagemaker:ResourceTag/${TagKey}`                            | string          | Filters access by a tag key and value pair                                                                                                                                                              |
| `sagemaker:RootAccess`                                       | string          | Filters access by the root access associated with the resource in the request                                                                                                                           |
| `sagemaker:SearchVisibilityCondition/${FilterKey}`           | string          | Limits the results of your search request to the resources that you can access. `${FilterKey}` is a key that the VisibilityConditions configuration presents in the Search request                      |
| `sagemaker:ServerlessMaxConcurrency`                         | number          | Filters access by limiting maximum concurrency used for Serverless inference in the request                                                                                                             |
| `sagemaker:ServerlessMemorySize`                             | number          | Filters access by limiting memory size used for Serverles s inference in the request                                                                                                                    |
| `sagemaker:SpaceSharingType`                                 | string          | Filters access by the sharing type associated with the space in the request                                                                                                                             |
| `sagemaker:StudioLifecycleConfigArns`                        | list of ARNs    | —                                                                                                                                                                                                       |
| `sagemaker:TaggingAction`                                    | string          | Filters access by the API actions to which a user can apply tags. Uses the name of the API operation that creates a taggable resource to filter access                                                  |
| `sagemaker:TargetModel`                                      | string          | Filters access by the target model associated with the Multi-Model Endpoint in the request                                                                                                              |
| `sagemaker:UpdatableFeatures`                                | list of strings | Filters access by the list of feature names being updated by an UpdateRecord API call. Absent on direct PutRecord calls                                                                                 |
| `sagemaker:UserProfileName`                                  | string          | You can use the UserProfileName as a policy variable to filter requests from specific user profiles within a SageMaker Domain. This context key is not applicable to user profiles within shared spaces |
| `sagemaker:VolumeKmsKey`                                     | ARN             | Filters access by the volume kms key associated with the resource in the request. This key has been deprecated. It has been replaced by sagemaker:VolumeKmsKeyArn                                       |
| `sagemaker:VolumeKmsKeyArn`                                  | ARN             | Filters access by the volume kms key associated with the resource in the request. The ARN of the key-id must be used                                                                                    |
| `sagemaker:VpcSecurityGroupIds`                              | list of strings | Filters access by the list of all VPC security group ids associated with the resource in the request                                                                                                    |
| `sagemaker:VpcSubnets`                                       | list of strings | Filters access by the list of all VPC subnets associated with the resource in the request                                                                                                               |
| `sagemaker:WorkteamArn`                                      | ARN             | Filters access by the workteam arn associated to the request                                                                                                                                            |
| `sagemaker:WorkteamType`                                     | string          | Filters access by the workteam type associated to the request. This can be public-crowd, private-crowd or vendor-crowd                                                                                  |

### secretsmanager

| Key                                              | Value           | Description                                                                                                  |
| ------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------ |
| `secretsmanager:AddReplicaRegions`               | list of strings | Filters access by the list of Regions in which to replicate the secret                                       |
| `secretsmanager:BlockPublicPolicy`               | true / false    | Filters access by whether the resource policy blocks broad AWS account access                                |
| `secretsmanager:Description`                     | string          | Filters access by the description text in the request                                                        |
| `secretsmanager:ExternalSecretRotationRoleArn`   | ARN             | Filters access by the managed external secret rotation role ARN in the request                               |
| `secretsmanager:ForceDeleteWithoutRecovery`      | true / false    | Filters access by whether the secret is to be deleted immediately without any recovery window                |
| `secretsmanager:ForceOverwriteReplicaSecret`     | true / false    | —                                                                                                            |
| `secretsmanager:KmsKeyArn`                       | ARN             | Filters access by the key ARN of the KMS key in the request                                                  |
| `secretsmanager:KmsKeyId`                        | string          | Filters access by the key identifier of the KMS key in the request. Deprecated: Use secretsmanager:KmsKeyArn |
| `secretsmanager:ModifyRotationRules`             | true / false    | Filters access by whether the rotation rules of the secret are to be modified                                |
| `secretsmanager:Name`                            | string          | Filters access by the friendly name of the secret in the request                                             |
| `secretsmanager:RecoveryWindowInDays`            | number          | Filters access by the number of days that Secrets Manager waits before it can delete the secret              |
| `secretsmanager:ResourceTag/tag-key`             | string          | Filters access by a tag key and value pair                                                                   |
| `secretsmanager:RotateImmediately`               | true / false    | Filters access by whether the secret is to be rotated immediately                                            |
| `secretsmanager:RotationLambdaARN`               | ARN             | Filters access by the ARN of the rotation Lambda function in the request                                     |
| `secretsmanager:SecretId`                        | ARN             | Filters access by the SecretID value in the request                                                          |
| `secretsmanager:SecretPrimaryRegion`             | string          | Filters access by primary region in which the secret is created if the secret is a multi-Region secret       |
| `secretsmanager:Type`                            | string          | Filters access by the managed external secret type in the request                                            |
| `secretsmanager:VersionId`                       | string          | Filters access by the unique identifier of the version of the secret in the request                          |
| `secretsmanager:VersionStage`                    | string          | Filters access by the list of version stages in the request                                                  |
| `secretsmanager:resource/AllowRotationLambdaArn` | ARN             | Filters access by the ARN of the rotation Lambda function associated with the secret                         |
| `secretsmanager:resource/Type`                   | string          | Filters access by the managed external secret type associated with the secret                                |

### securityhub

| Key                                            | Value  | Description                                                               |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `securityhub:ASFFSyntaxPath/${ASFFSyntaxPath}` | string | Filters access by the specified fields and values in the request          |
| `securityhub:OCSFSyntaxPath/${OCSFSyntaxPath}` | string | Filters access by the specified fields and values in the request          |
| `securityhub:TargetAccount`                    | string | Filters access by the AwsAccountId field that is specified in the request |

### serverlessrepo

| Key                              | Value  | Description                        |
| -------------------------------- | ------ | ---------------------------------- |
| `serverlessrepo:applicationType` | string | Filters access by application type |

### servicecatalog

| Key                           | Value  | Description                                                                                                                               |
| ----------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `servicecatalog:Resource`     | string | Filters access by controlling what value can be specified as the Resource parameter in an AppRegistry associate resource API              |
| `servicecatalog:ResourceType` | string | Filters access by controlling what value can be specified as the ResourceType parameter in an AppRegistry associate resource API          |
| `servicecatalog:accountLevel` | string | Filters access by user to see and perform actions on resources created by anyone in the account                                           |
| `servicecatalog:roleLevel`    | string | Filters access by user to see and perform actions on resources created either by them or by anyone federatin g into the same role as them |
| `servicecatalog:userLevel`    | string | Filters access by user to see and perform actions on only resources that they created                                                     |

### servicediscovery

| Key                                        | Value  | Description                                                                           |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------- |
| `servicediscovery:NamespaceArn`            | ARN    | Filters access by specifying the Amazon Resource Name (ARN) for the related namespace |
| `servicediscovery:NamespaceName`           | string | Filters access by specifying the name of the related namespace                        |
| `servicediscovery:ServiceArn`              | ARN    | Filters access by specifying the Amazon Resource Name (ARN) for the related service   |
| `servicediscovery:ServiceCreatedByAccount` | string | Filters access by specifying the account id of the related service creator            |
| `servicediscovery:ServiceName`             | string | Filters access by specifying the name of the related service                          |

### servicequotas

| Key                     | Value  | Description                                 |
| ----------------------- | ------ | ------------------------------------------- |
| `servicequotas:service` | string | Filters access by the specified AWS service |

### ses

| Key                               | Value           | Description                                                                                                                     |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `ses:AddonSubscriptionArn`        | ARN             | Filters access by SES Addon Subscription ARN                                                                                    |
| `ses:ApiVersion`                  | string          | Filters access by the SES API version                                                                                           |
| `ses:ExportSourceType`            | string          | Filters access by the export source type                                                                                        |
| `ses:FeedbackAddress`             | string          | Filters access by the "Return-Path" address, which specifies where bounces and complaints are sent by email feedback forwarding |
| `ses:FromAddress`                 | string          | Filters access by the "From" address of a message                                                                               |
| `ses:FromDisplayName`             | string          | Filters access by the "From" address that is used as the display name of a message                                              |
| `ses:MailManagerIngressPointType` | string          | Filters access by SES Mail Manager ingress point type, for example OPEN or AUTH                                                 |
| `ses:MailManagerRuleSetArn`       | ARN             | Filters access by SES Mail Manager rule set ARN                                                                                 |
| `ses:MailManagerTrafficPolicyArn` | ARN             | —                                                                                                                               |
| `ses:MultiRegionEndpointId`       | string          | Filters access by the multi-region endpoint ID that is used to send email                                                       |
| `ses:Recipients`                  | list of strings | Filters access by the recipient addresses of a message, which include the "To", "CC", and "BCC" addresses                       |
| `ses:ReplicaRegion`               | list of strings | Filters access by the replica regions for Replicating domain DKIM signing key                                                   |
| `ses:TenantName`                  | string          | Filters access by the tenant name that is used to send email                                                                    |

### signer

| Key                     | Value  | Description |
| ----------------------- | ------ | ----------- |
| `signer:ProfileVersion` | string | —           |

### signin

| Key                                | Value  | Description                                                                        |
| ---------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `signin:OAuthClientAuthentication` | string | Filters access by the client authentication method used in the OAuth token request |
| `signin:OAuthClientId`             | string | Filters access by the OAuth client ID used in the authorization or token request   |
| `signin:OAuthGrantType`            | string | Filters access by the OAuth grant type used in the token request                   |
| `signin:OAuthRedirectUri`          | string | Filters access by the redirect URI specified in the OAuth authorization request    |
| `signin:OAuthTokenType`            | string | Filters access by the type of OAuth token being operated on                        |
| `signin:PrincipalArn`              | ARN    | Filters access by the principal ARN during pre-authe ntication console sign-in     |

### sns

| Key            | Value  | Description                                                                                                      |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| `sns:Endpoint` | string | Filters access by the URL, email address, or ARN from a Subscribe request or a previously confirmed subscription |
| `sns:Protocol` | string | Filters access by the protocol value from a Subscribe request or a previously confirmed subscription             |

### ssm

| Key                                          | Value           | Description                                                                                                                                                                                                                                                                           |
| -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ec2:SourceInstanceARN`                      | ARN             | Filters access by the ARN of the instance from which the request originated                                                                                                                                                                                                           |
| `ssm:AccessRequestId`                        | string          | Filters access by verifying that a user has access to the access request ID specified in the request                                                                                                                                                                                  |
| `ssm:AutoApprove`                            | true / false    | Filters access by verifying that a user has permission to start Change Manager workflows without a review step (with the exception of change freeze events)                                                                                                                           |
| `ssm:DocumentCategories`                     | list of strings | Filters access by verifying that a user has permission to access a document belonging to a specific category enum                                                                                                                                                                     |
| `ssm:DocumentType`                           | string          | Filters access by verifying that a user has permission to access a document belonging to a specific document type. Only available in "aws", "aws-cn", and "aws-us-gov" partitions                                                                                                     |
| `ssm:DocumentVersion`                        | list of strings | Filters access by verifying that a user has permission to access a specific version of a document                                                                                                                                                                                     |
| `ssm:InventoryTypeName`                      | list of strings | Filters access by verifying that a user also has access to the InventoryType specified in the request                                                                                                                                                                                 |
| `ssm:NodeAccountId`                          | string          | Filters access by the AWS account ID associated with the managed node making the request. Available only in VPC endpoint policies and service control policies (SCPs)                                                                                                                 |
| `ssm:NodeOrgId`                              | string          | Filters access by the AWS Organizations ID associated with the managed node making the request. Available only in VPC endpoint policies and service control policies (SCPs)                                                                                                           |
| `ssm:Overwrite`                              | string          | Filters access by controling whether Systems Manager parameters can be overwritten                                                                                                                                                                                                    |
| `ssm:Policies`                               | string          | Filters access by controlling whether an IAM Entity (user or role) can create or update a parameter that includes a parameter policy                                                                                                                                                  |
| `ssm:Recursive`                              | string          | Filters access by Systems Manager parameters created in a hierarchical structure                                                                                                                                                                                                      |
| `ssm:SessionDocumentAccessCheck`             | true / false    | Filters access by verifying that a user has permission to access either the default Session Manager configuration document or the custom configuration document specified in a request                                                                                                |
| `ssm:SourceInstanceARN`                      | ARN             | Filters access by verifying the Amazon Resource Name (ARN) of the AWS Systems Manager's managed instance from which the request is made. This key is not present when the request comes from the managed instance authenticated with an IAM role associated with EC2 instance profile |
| `ssm:SyncType`                               | string          | Filters access by verifying that a user also has access to the ResourceDataSync SyncType specified in the request                                                                                                                                                                     |
| `ssm:resourceTag/${TagKey}`                  | string          | Filters access by a tag key-value pair assigned to the Systems Manager resource                                                                                                                                                                                                       |
| `ssm:resourceTag/aws:ssmmessages:session-id` | string          | Filters access by based on a tag key-value pair assigned to the Systems Manager session resource                                                                                                                                                                                      |
| `ssm:resourceTag/aws:ssmmessages:target-id`  | string          | Filters access by based on a tag key-value pair assigned to the Systems Manager session resource                                                                                                                                                                                      |
| `ssm:resourceTag/tag-key`                    | string          | Filters access by based on a tag key-value pair assigned to the Systems Manager resource                                                                                                                                                                                              |

### ssmmessages

| Key                     | Value | Description                                                                                                                                                                                                                                                                           |
| ----------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ec2:SourceInstanceARN` | ARN   | Filters access by the ARN of the instance from which the request originated                                                                                                                                                                                                           |
| `ssm:SourceInstanceARN` | ARN   | Filters access by verifying the Amazon Resource Name (ARN) of the AWS Systems Manager's managed instance from which the request is made. This key is not present when the request comes from the managed instance authenticated with an IAM role associated with EC2 instance profile |

### sso

| Key                             | Value  | Description                                                                                                                              |
| ------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `identitycenter:ApplicationArn` | ARN    | Filters access by the ARN of the IAM Identity Center application                                                                         |
| `identitycenter:InstanceArn`    | ARN    | Filters access by the ARN of the IAM Identity Center instance                                                                            |
| `sso:ApplicationAccount`        | string | Filters access by the account which creates the applicati on. This condition key is not supported for customer managed SAML applications |
| `sso:PrimaryRegion`             | string | Filters access by the primary region of the IAM Identity Center instance                                                                 |

### states

| Key                            | Value           | Description                                                                   |
| ------------------------------ | --------------- | ----------------------------------------------------------------------------- |
| `states:HTTPEndpoint`          | string          | Filters access by the endpoint that the HTTP Task state allows in the request |
| `states:HTTPMethod`            | string          | Filters access by the method that the HTTP Task state allows in the request   |
| `states:StateMachineQualifier` | list of strings | —                                                                             |

### sts

| Key                                                                  | Value           | Description                                                                                                                              |
| -------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `accounts.google.com:aud`                                            | string          | Filters access by the Google application ID                                                                                              |
| `accounts.google.com:google/organization_number`                     | number          | Filters access by the Google Cloud or Google Workspace organization number                                                               |
| `accounts.google.com:oaud`                                           | string          | Filters access by the Google audience                                                                                                    |
| `accounts.google.com:sub`                                            | string          | Filters access by the subject of the claim (the Google user ID)                                                                          |
| `agent.${Domain}.buildkite.dev:build_branch`                         | string          | —                                                                                                                                        |
| `agent.${Domain}.buildkite.dev:cluster_id`                           | string          | Filters access by the Buildkite cluster ID                                                                                               |
| `agent.${Domain}.buildkite.dev:cluster_name`                         | string          | Filters access by the Buildkite cluster name                                                                                             |
| `agent.${Domain}.buildkite.dev:organization_id`                      | string          | Filters access by the Buildkite organization ID                                                                                          |
| `agent.${Domain}.buildkite.dev:organization_slug`                    | string          | Filters access by the Buildkite organization slug                                                                                        |
| `agent.${Domain}.buildkite.dev:pipeline_id`                          | string          | Filters access by the Buildkite pipeline ID                                                                                              |
| `agent.${Domain}.buildkite.dev:pipeline_slug`                        | string          | Filters access by the Buildkite pipeline slug                                                                                            |
| `agent.${Domain}.buildkite.site:build_branch`                        | string          | Filters access by the git branch that triggered the Buildkite build                                                                      |
| `agent.${Domain}.buildkite.site:cluster_id`                          | string          | Filters access by the Buildkite cluster ID                                                                                               |
| `agent.${Domain}.buildkite.site:cluster_name`                        | string          | Filters access by the Buildkite cluster name                                                                                             |
| `agent.${Domain}.buildkite.site:organization_id`                     | string          | Filters access by the Buildkite organization ID                                                                                          |
| `agent.${Domain}.buildkite.site:organization_slug`                   | string          | Filters access by the Buildkite organization slug                                                                                        |
| `agent.${Domain}.buildkite.site:pipeline_id`                         | string          | Filters access by the Buildkite pipeline ID                                                                                              |
| `agent.${Domain}.buildkite.site:pipeline_slug`                       | string          | Filters access by the Buildkite pipeline slug                                                                                            |
| `agent.buildkite.com:build_branch`                                   | string          | Filters access by the git branch that triggered the Buildkite build                                                                      |
| `agent.buildkite.com:cluster_id`                                     | string          | Filters access by the Buildkite cluster ID                                                                                               |
| `agent.buildkite.com:cluster_name`                                   | string          | Filters access by the Buildkite cluster name                                                                                             |
| `agent.buildkite.com:organization_id`                                | string          | Filters access by the Buildkite organization ID                                                                                          |
| `agent.buildkite.com:organization_slug`                              | string          | Filters access by the Buildkite organization slug                                                                                        |
| `agent.buildkite.com:pipeline_id`                                    | string          | Filters access by the Buildkite pipeline ID                                                                                              |
| `agent.buildkite.com:pipeline_slug`                                  | string          | Filters access by the Buildkite pipeline slug                                                                                            |
| `cognito-identity.amazonaws.com:amr`                                 | string          | Filters access by the login information for Amazon Cognito                                                                               |
| `cognito-identity.amazonaws.com:aud`                                 | string          | Filters access by the Amazon Cognito identity pool ID                                                                                    |
| `cognito-identity.amazonaws.com:sub`                                 | string          | Filters access by the subject of the claim (the Amazon Cognito user ID)                                                                  |
| `github.com/enterprises/${EnterpriseName}:actor`                     | string          | Filters access by the personal account that initiated the workflow run                                                                   |
| `github.com/enterprises/${EnterpriseName}:actor_id`                  | string          | Filters access by the ID of the personal account that initiated the workflow run                                                         |
| `github.com/enterprises/${EnterpriseName}:enterprise_id`             | string          | Filters access by the ID of the enterprise that contains the repository from where the workflow is running                               |
| `github.com/enterprises/${EnterpriseName}:environment`               | string          | Filters access by the name of the environment used by the job                                                                            |
| `github.com/enterprises/${EnterpriseName}:job_workflow_ref`          | string          | —                                                                                                                                        |
| `github.com/enterprises/${EnterpriseName}:ref`                       | string          | Filters access by the git ref (branch or tag) that triggered the workflow run                                                            |
| `github.com/enterprises/${EnterpriseName}:repository`                | string          | Filters access by the repository from where the workflow is running                                                                      |
| `github.com/enterprises/${EnterpriseName}:repository_id`             | string          | Filters access by the ID of the repository from where the workflow is running                                                            |
| `github.com/enterprises/${EnterpriseName}:repository_owner_id`       | string          | Filters access by the ID of the repository owner from where the workflow is running                                                      |
| `github.com/enterprises/${EnterpriseName}:workflow`                  | string          | —                                                                                                                                        |
| `gitlab.com:namespace_id`                                            | string          | Filters access by the GitLab namespace (group) ID of the project running the CI/CD job                                                   |
| `gitlab.com:pipeline_source`                                         | string          | Filters access by the source that triggered the GitLab pipeline                                                                          |
| `gitlab.com:project_id`                                              | string          | Filters access by the GitLab project ID running the CI/CD job                                                                            |
| `gitlab.com:ref_protected`                                           | string          | Filters access by whether the GitLab git ref that triggered the job is protected                                                         |
| `gitlab.com:runner_environment`                                      | string          | Filters access by the GitLab runner environment for the CI/CD job                                                                        |
| `gitlab.com:user_access_level`                                       | string          | Filters access by the GitLab user access level within the project                                                                        |
| `gitlab.com:user_email`                                              | string          | Filters access by the GitLab user email executing the CI/ CD job                                                                         |
| `gitlab.com:user_id`                                                 | string          | Filters access by the GitLab user ID executing the CI/CD job                                                                             |
| `gitlab.com:user_login`                                              | string          | Filters access by the GitLab username executing the CI/ CD job                                                                           |
| `graph.facebook.com:app_id`                                          | string          | Filters access by the Facebook application ID                                                                                            |
| `graph.facebook.com:id`                                              | string          | Filters access by the Facebook user ID                                                                                                   |
| `iam:ResourceTag/${TagKey}`                                          | string          | Filters access by the tags that are attached to the role that is being assumed                                                           |
| `idcs-${OciUniqueIdentifier}.identity.oraclecloud.com:rpst_id`       | string          | —                                                                                                                                        |
| `oidc.circleci.com/org/${OrgId}:oidc.circleci.com/project-id`        | string          | Filters access by the CircleCI project ID                                                                                                |
| `saml:aud`                                                           | string          | Filters access by the endpoint URL to which SAML assertions are presented                                                                |
| `saml:cn`                                                            | list of strings | Filters access by the eduOrg attribute                                                                                                   |
| `saml:commonName`                                                    | string          | Filters access by the commonName attribute                                                                                               |
| `saml:doc`                                                           | string          | Filters access by on the principal that was used to assume the role                                                                      |
| `saml:eduorghomepageuri`                                             | list of strings | Filters access by the eduOrg attribute                                                                                                   |
| `saml:eduorgidentityauthnpolicyuri`                                  | list of strings | Filters access by the eduOrg attribute                                                                                                   |
| `saml:eduorglegalname`                                               | list of strings | Filters access by the eduOrg attribute                                                                                                   |
| `saml:eduorgsuperioruri`                                             | list of strings | Filters access by the eduOrg attribute                                                                                                   |
| `saml:eduorgwhitepagesuri`                                           | list of strings | Filters access by the eduOrg attribute                                                                                                   |
| `saml:edupersonaffiliation`                                          | list of strings | —                                                                                                                                        |
| `saml:edupersonassurance`                                            | list of strings | Filters access by the eduPerson attribute                                                                                                |
| `saml:edupersonentitlement`                                          | list of strings | Filters access by the eduPerson attribute                                                                                                |
| `saml:edupersonnickname`                                             | list of strings | Filters access by the eduPerson attribute                                                                                                |
| `saml:edupersonorgdn`                                                | string          | Filters access by the eduPerson attribute                                                                                                |
| `saml:edupersonorgunitdn`                                            | list of strings | Filters access by the eduPerson attribute                                                                                                |
| `saml:edupersonprimaryaffiliation`                                   | string          | —                                                                                                                                        |
| `saml:edupersonprimaryorgunitdn`                                     | string          | Filters access by the eduPerson attribute                                                                                                |
| `saml:edupersonprincipalname`                                        | string          | Filters access by the eduPerson attribute                                                                                                |
| `saml:edupersonscopedaffiliation`                                    | list of strings | —                                                                                                                                        |
| `saml:edupersontargetedid`                                           | list of strings | Filters access by the eduPerson attribute                                                                                                |
| `saml:givenName`                                                     | string          | Filters access by the givenName attribute                                                                                                |
| `saml:iss`                                                           | string          | Filters access by on the issuer, which is represented by a URN                                                                           |
| `saml:mail`                                                          | string          | Filters access by the mail attribute                                                                                                     |
| `saml:name`                                                          | string          | Filters access by the name attribute                                                                                                     |
| `saml:namequalifier`                                                 | string          | —                                                                                                                                        |
| `saml:organizationStatus`                                            | string          | Filters access by the organizationStatus attribute                                                                                       |
| `saml:primaryGroupSID`                                               | string          | Filters access by the primaryGroupSID attribute                                                                                          |
| `saml:sub`                                                           | string          | Filters access by the subject of the claim (the SAML user ID)                                                                            |
| `saml:sub_type`                                                      | string          | Filters access by the value persistent, transient, or the full Format URI                                                                |
| `saml:surname`                                                       | string          | Filters access by the surname attribute                                                                                                  |
| `saml:uid`                                                           | string          | Filters access by the uid attribute                                                                                                      |
| `saml:x500UniqueIdentifier`                                          | string          | —                                                                                                                                        |
| `sts:AWSServiceName`                                                 | string          | Filters access by the service that is obtaining a bearer token                                                                           |
| `sts:DurationSeconds`                                                | number          | Filters access by the duration in seconds when getting a bearer token or a JSON Web Token (JWT) from the GetWebIdentityToken API         |
| `sts:ExternalId`                                                     | string          | Filters access by the unique identifier required when you assume a role in another account                                               |
| `sts:IdentityTokenAudience`                                          | list of strings | Filters access by the audience that is passed in the request                                                                             |
| `sts:RequestContext/${ContextKey}`                                   | string          | Filters access by the session context key-value pairs embedded in the signed context assertion retrieved from a trusted context provider |
| `sts:RequestContextProviders`                                        | list of ARNs    | Filters access by the context provider ARNs                                                                                              |
| `sts:RoleAuthorizedByIdp`                                            | true / false    | Filters access based on whether the identity provider authorized the role via the roles claim in the OIDC token                          |
| `sts:RoleSessionName`                                                | string          | Filters access by the role session name required when you assume a role                                                                  |
| `sts:SigningAlgorithm`                                               | string          | Filters access by the signing algorithm that is passed in the request                                                                    |
| `sts:SourceIdentity`                                                 | string          | Filters access by the source identity that is passed in the request                                                                      |
| `sts:TaskPolicyArn`                                                  | ARN             | Filters access by TaskPolicyARN                                                                                                          |
| `sts:TransitiveTagKeys`                                              | list of strings | Filters access by the transitive tag keys that are passed in the request                                                                 |
| `token.actions.${Domain}.ghe.com:actor`                              | string          | Filters access by the personal account that initiated the workflow run                                                                   |
| `token.actions.${Domain}.ghe.com:actor_id`                           | string          | Filters access by the ID of the personal account that initiated the workflow run                                                         |
| `token.actions.${Domain}.ghe.com:enterprise_id`                      | string          | Filters access by the ID of the enterprise that contains the repository from where the workflow is running                               |
| `token.actions.${Domain}.ghe.com:environment`                        | string          | Filters access by the name of the environment used by the job                                                                            |
| `token.actions.${Domain}.ghe.com:job_workflow_ref`                   | string          | —                                                                                                                                        |
| `token.actions.${Domain}.ghe.com:ref`                                | string          | Filters access by the git ref (branch or tag) that triggered the workflow run                                                            |
| `token.actions.${Domain}.ghe.com:repository`                         | string          | Filters access by the repository from where the workflow is running                                                                      |
| `token.actions.${Domain}.ghe.com:repository_id`                      | string          | Filters access by the ID of the repository from where the workflow is running                                                            |
| `token.actions.${Domain}.ghe.com:repository_owner_id`                | string          | Filters access by the ID of the repository owner from where the workflow is running                                                      |
| `token.actions.${Domain}.ghe.com:workflow`                           | string          | —                                                                                                                                        |
| `token.actions.githubusercontent.com/${SubPath}:actor`               | string          | Filters access by the personal account that initiated the workflow run                                                                   |
| `token.actions.githubusercontent.com/${SubPath}:actor_id`            | string          | Filters access by the ID of the personal account that initiated the workflow run                                                         |
| `token.actions.githubusercontent.com/${SubPath}:enterprise_id`       | string          | Filters access by the ID of the enterprise that contains the repository from where the workflow is running                               |
| `token.actions.githubusercontent.com/${SubPath}:environment`         | string          | Filters access by the name of the environment used by the job                                                                            |
| `token.actions.githubusercontent.com/${SubPath}:job_workflow_ref`    | string          | —                                                                                                                                        |
| `token.actions.githubusercontent.com/${SubPath}:ref`                 | string          | Filters access by the git ref (branch or tag) that triggered the workflow run                                                            |
| `token.actions.githubusercontent.com/${SubPath}:repository`          | string          | Filters access by the repository from where the workflow is running                                                                      |
| `token.actions.githubusercontent.com/${SubPath}:repository_id`       | string          | Filters access by the ID of the repository from where the workflow is running                                                            |
| `token.actions.githubusercontent.com/${SubPath}:repository_owner_id` | string          | Filters access by the ID of the repository owner from where the workflow is running                                                      |
| `token.actions.githubusercontent.com/${SubPath}:workflow`            | string          | —                                                                                                                                        |
| `token.actions.githubusercontent.com:actor`                          | string          | Filters access by the personal account that initiated the workflow run                                                                   |
| `token.actions.githubusercontent.com:actor_id`                       | string          | Filters access by the ID of the personal account that initiated the workflow run                                                         |
| `token.actions.githubusercontent.com:enterprise_id`                  | string          | Filters access by the ID of the enterprise that contains the repository from where the workflow is running                               |
| `token.actions.githubusercontent.com:environment`                    | string          | Filters access by the name of the environment used by the job                                                                            |
| `token.actions.githubusercontent.com:job_workflow_ref`               | string          | Filters access by the reference path to the reusable workflow for jobs using a reusable workflow                                         |
| `token.actions.githubusercontent.com:ref`                            | string          | Filters access by the git ref (branch or tag) that triggered the workflow run                                                            |
| `token.actions.githubusercontent.com:repository`                     | string          | Filters access by the repository from where the workflow is running                                                                      |
| `token.actions.githubusercontent.com:repository_id`                  | string          | Filters access by the ID of the repository from where the workflow is running                                                            |
| `token.actions.githubusercontent.com:repository_owner_id`            | string          | Filters access by the ID of the repository owner from where the workflow is running                                                      |
| `token.actions.githubusercontent.com:workflow`                       | string          | —                                                                                                                                        |
| `www.amazon.com:app_id`                                              | string          | Filters access by the Login with Amazon application ID                                                                                   |
| `www.amazon.com:user_id`                                             | string          | Filters access by the Login with Amazon user ID                                                                                          |

### swf

| Key                        | Value  | Description                                              |
| -------------------------- | ------ | -------------------------------------------------------- |
| `swf:activityType.name`    | string | Filters access by the name of the activity type          |
| `swf:activityType.version` | string | Filters access by the version of the activity type       |
| `swf:defaultTaskList.name` | string | Filters access by the name of the default task list      |
| `swf:name`                 | string | Filters access by the name of activities or workflows    |
| `swf:tagFilter.tag`        | string | Filters access by the value of tagFilter.tag             |
| `swf:tagList.member.0`     | string | Filters access by the specified tag                      |
| `swf:tagList.member.1`     | string | Filters access by the specified tag                      |
| `swf:tagList.member.2`     | string | Filters access by the specified tag                      |
| `swf:tagList.member.3`     | string | Filters access by the specified tag                      |
| `swf:tagList.member.4`     | string | Filters access by the specified tag                      |
| `swf:taskList.name`        | string | Filters access by the name of the tasklist               |
| `swf:typeFilter.name`      | string | Filters access by the name of the type filter            |
| `swf:typeFilter.version`   | string | Filters access by the version of the type filter         |
| `swf:version`              | string | Filters access by the version of activities or workflows |
| `swf:workflowType.name`    | string | Filters access by the name of the workflow type          |
| `swf:workflowType.version` | string | Filters access by the version of the workflow type       |

### synthetics

| Key                | Value           | Description                                    |
| ------------------ | --------------- | ---------------------------------------------- |
| `synthetics:Names` | list of strings | Filters access based on the name of the canary |

### timestream-influxdb

| Key                               | Value  | Description |
| --------------------------------- | ------ | ----------- |
| `timestream-influxdb:RestoreMode` | string | —           |

### transcribe

| Key                                   | Value  | Description                                                                                       |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `transcribe:OutputBucketName`         | string | Filters access based on the output bucket name included in the request                            |
| `transcribe:OutputEncryptionKMSKeyId` | string | Filters access based on the KMS key id included in the request, provided in the form of a KMS key |
| `transcribe:OutputKey`                | string | Filters access based on the output key included in the request                                    |
| `transcribe:OutputLocation`           | string | Filters access based on the output location included in the request                               |

### transfer

| Key                                  | Value           | Description                                                              |
| ------------------------------------ | --------------- | ------------------------------------------------------------------------ |
| `transfer:RequestConnectorProtocol`  | string          | Filters access by the connector protocol that is passed in the request   |
| `transfer:RequestSecurityPolicyName` | string          | Filters access by the security policy name that is passed in the request |
| `transfer:RequestServerDomain`       | string          | Filters access by the storage domain that is passed in the request       |
| `transfer:RequestServerEndpointType` | string          | Filters access by the endpoint type that is passed in the request        |
| `transfer:RequestServerProtocols`    | list of strings | Filters access by the server protocols that are passed in the request    |

### user-subscriptions

| Key                                | Value        | Description                                                                         |
| ---------------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| `user-subscriptions:CreateForSelf` | true / false | Filters access by only allowing creation of User subscription Claims for the caller |

### vpc-lattice

| Key                                      | Value           | Description                                                                                                          |
| ---------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `vpc-lattice:AuthType`                   | string          | Filters access by the auth type specified in the request                                                             |
| `vpc-lattice:CreateAction`               | string          | Filters access by the name of a resource-creating API action and only available during tagging resources on creation |
| `vpc-lattice:DomainName`                 | string          | Filters access by the domain name                                                                                    |
| `vpc-lattice:PrivateDnsPreference`       | string          | Filters access by the private dns preference                                                                         |
| `vpc-lattice:PrivateDnsSpecifiedDomains` | list of strings | —                                                                                                                    |
| `vpc-lattice:Protocol`                   | string          | Filters access by the protocol specified in the request                                                              |
| `vpc-lattice:ResourceConfigurationArn`   | ARN             | —                                                                                                                    |
| `vpc-lattice:SecurityGroupIds`           | list of strings | Filters access by the IDs of security groups                                                                         |
| `vpc-lattice:ServiceArn`                 | ARN             | Filters access by the ARN of a service                                                                               |
| `vpc-lattice:ServiceNetworkArn`          | ARN             | Filters access by the ARN of a service network                                                                       |
| `vpc-lattice:TargetGroupArns`            | list of ARNs    | Filters access by the ARNs of target groups                                                                          |
| `vpc-lattice:VpcEndpointId`              | string          | Filters access by the ID of a VPC endpoint                                                                           |
| `vpc-lattice:VpcId`                      | string          | Filters access by the ID of a virtual private cloud (VPC)                                                            |

### vpc-lattice-svcs

| Key                                                     | Value           | Description                                                              |
| ------------------------------------------------------- | --------------- | ------------------------------------------------------------------------ |
| `vpc-lattice-svcs:Port`                                 | number          | Filters access by the destination port the request is made to            |
| `vpc-lattice-svcs:RequestHeader/${HeaderName}`          | string          | Filters access by a header name-value pair in the request headers        |
| `vpc-lattice-svcs:RequestMethod`                        | string          | Filters access by the method of the request                              |
| `vpc-lattice-svcs:RequestPath`                          | string          | Filters access by the path portion of the request URL                    |
| `vpc-lattice-svcs:RequestQueryString/${QueryStringKey}` | list of strings | Filters access by the query string key-value pairs in the request URL    |
| `vpc-lattice-svcs:ServiceArn`                           | ARN             | Filters access by the ARN of the service receiving the request           |
| `vpc-lattice-svcs:ServiceNetworkArn`                    | ARN             | Filters access by the ARN of the service network receiving the request   |
| `vpc-lattice-svcs:SourceVpc`                            | string          | Filters access by the VPC the request is made from                       |
| `vpc-lattice-svcs:SourceVpcOwnerAccount`                | string          | Filters access by the owning account of the VPC the request is made from |

### wafv2

| Key                            | Value  | Description                                                            |
| ------------------------------ | ------ | ---------------------------------------------------------------------- |
| `wafv2:LogDestinationResource` | ARN    | Filters access by log destination ARN for PutLoggin gConfiguration API |
| `wafv2:LogScope`               | string | Filters access by log scope for Logging Configuration API              |

### wellarchitected

| Key                              | Value  | Description                   |
| -------------------------------- | ------ | ----------------------------- |
| `wellarchitected:JiraProjectKey` | string | Filters access by project key |

### wisdom

| Key                                        | Value           | Description |
| ------------------------------------------ | --------------- | ----------- |
| `wisdom:MessageTemplate/RoutingProfileArn` | list of ARNs    | —           |
| `wisdom:SearchFilter/Qualifier`            | list of strings | —           |
| `wisdom:SearchFilter/RoutingProfileArn`    | ARN             | —           |

### workmail

| Key                            | Value  | Description                                                             |
| ------------------------------ | ------ | ----------------------------------------------------------------------- |
| `workmail:ImpersonationRoleId` | string | Filters access by the ImpersonationRoleId that is passed in the request |

### workspaces

| Key                 | Value  | Description                                     |
| ------------------- | ------ | ----------------------------------------------- |
| `workspaces:userId` | string | Filters access by the ID of the Workspaces user |

### xray

| Key                              | Value        | Description                                                              |
| -------------------------------- | ------------ | ------------------------------------------------------------------------ |
| `logs:LogGeneratingResourceArns` | list of ARNs | Filters access by the Log Generating Resource ARNs passed in the request |
| `xray:ResourcePolicyName`        | string       | Filters access by PolicyName in the request                              |
| `xray:TraceSegmentDestination`   | string       | Filters access by TraceSegmentDestination type in the request            |
