interface Snippet {
  id: string;
  title: string;
  note?: string;
  lang: 'json' | 'yaml' | 'bash' | 'javascript';
  code: string;
}

interface Group {
  id: string;
  title: string;
  blurb: string;
  snippets: Snippet[];
}

const pipeline: Group = {
  id: 'pipeline',
  title: 'Pipeline',
  blurb: 'Create and operate a V2 pipeline with GitHub, CodeBuild, approval, and CodeDeploy.',
  snippets: [
    {
      id: 'pipeline-complete',
      title: 'GitHub → CodeBuild → approval → CodeDeploy',
      note: 'The referenced resources must already exist, and BuildArtifact must contain the AppSpec and deployment files.',
      lang: 'json',
      code: `{
  "pipeline": {
    "name": "app",
    "pipelineType": "V2",
    "executionMode": "SUPERSEDED",
    "roleArn": "arn:aws:iam::111122223333:role/codepipeline-app",
    "artifactStore": {
      "type": "S3",
      "location": "codepipeline-eu-central-1-111122223333"
    },
    "stages": [
      {
        "name": "Source",
        "actions": [
          {
            "name": "GitHub",
            "actionTypeId": {
              "category": "Source",
              "owner": "AWS",
              "provider": "CodeStarSourceConnection",
              "version": "1"
            },
            "configuration": {
              "ConnectionArn": "arn:aws:codeconnections:eu-central-1:111122223333:connection/00000000-0000-0000-0000-000000000000",
              "FullRepositoryId": "owner/repository",
              "BranchName": "main",
              "OutputArtifactFormat": "CODE_ZIP",
              "DetectChanges": "true"
            },
            "outputArtifacts": [{ "name": "SourceArtifact" }],
            "namespace": "SourceVariables",
            "runOrder": 1
          }
        ]
      },
      {
        "name": "Build",
        "actions": [
          {
            "name": "BuildAndTest",
            "actionTypeId": {
              "category": "Build",
              "owner": "AWS",
              "provider": "CodeBuild",
              "version": "1"
            },
            "configuration": { "ProjectName": "app" },
            "inputArtifacts": [{ "name": "SourceArtifact" }],
            "outputArtifacts": [{ "name": "BuildArtifact" }],
            "namespace": "BuildVariables",
            "runOrder": 1
          }
        ]
      },
      {
        "name": "Approval",
        "actions": [
          {
            "name": "Production",
            "actionTypeId": {
              "category": "Approval",
              "owner": "AWS",
              "provider": "Manual",
              "version": "1"
            },
            "configuration": {
              "CustomData": "Deploy #{codepipeline.PipelineExecutionId} to production"
            },
            "runOrder": 1
          }
        ]
      },
      {
        "name": "Deploy",
        "actions": [
          {
            "name": "CodeDeploy",
            "actionTypeId": {
              "category": "Deploy",
              "owner": "AWS",
              "provider": "CodeDeploy",
              "version": "1"
            },
            "configuration": {
              "ApplicationName": "app",
              "DeploymentGroupName": "production"
            },
            "inputArtifacts": [{ "name": "BuildArtifact" }],
            "runOrder": 1
          }
        ]
      }
    ]
  }
}`,
    },
    {
      id: 'pipeline-cli',
      title: 'Create, update, run, and inspect',
      lang: 'bash',
      code: `aws codepipeline create-pipeline --cli-input-json file://pipeline.json
aws codepipeline update-pipeline --cli-input-json file://pipeline.json
aws codepipeline start-pipeline-execution --name app
aws codepipeline get-pipeline-state --name app
aws codepipeline list-pipeline-executions --pipeline-name app --max-results 10
aws codepipeline get-pipeline-execution --pipeline-name app --pipeline-execution-id EXECUTION_ID
aws codepipeline retry-stage-execution \\
  --pipeline-name app \\
  --pipeline-execution-id EXECUTION_ID \\
  --stage-name Deploy \\
  --retry-mode FAILED_ACTIONS`,
    },
    {
      id: 'pipeline-parallel',
      title: 'Parallel actions and ordering',
      note: 'Actions with the same runOrder execute in parallel. The next runOrder starts after all actions in the previous order succeed.',
      lang: 'json',
      code: `{
  "name": "Test",
  "actions": [
    {
      "name": "UnitTests",
      "actionTypeId": { "category": "Test", "owner": "AWS", "provider": "CodeBuild", "version": "1" },
      "configuration": { "ProjectName": "unit-tests" },
      "inputArtifacts": [{ "name": "SourceArtifact" }],
      "runOrder": 1
    },
    {
      "name": "IntegrationTests",
      "actionTypeId": { "category": "Test", "owner": "AWS", "provider": "CodeBuild", "version": "1" },
      "configuration": { "ProjectName": "integration-tests" },
      "inputArtifacts": [{ "name": "SourceArtifact" }],
      "runOrder": 1
    },
    {
      "name": "SecurityScan",
      "actionTypeId": { "category": "Test", "owner": "AWS", "provider": "CodeBuild", "version": "1" },
      "configuration": { "ProjectName": "security-scan" },
      "inputArtifacts": [{ "name": "SourceArtifact" }],
      "runOrder": 2
    }
  ]
}`,
    },
  ],
};

const sources: Group = {
  id: 'sources',
  title: 'Sources',
  blurb: 'Common source actions and their output artifacts.',
  snippets: [
    {
      id: 'source-github',
      title: 'GitHub, GitLab, or Bitbucket connection',
      lang: 'json',
      code: `{
  "name": "Source",
  "actionTypeId": {
    "category": "Source",
    "owner": "AWS",
    "provider": "CodeStarSourceConnection",
    "version": "1"
  },
  "configuration": {
    "ConnectionArn": "arn:aws:codeconnections:eu-central-1:111122223333:connection/CONNECTION_ID",
    "FullRepositoryId": "owner/repository",
    "BranchName": "main",
    "OutputArtifactFormat": "CODE_ZIP",
    "DetectChanges": "true"
  },
  "outputArtifacts": [{ "name": "SourceArtifact" }],
  "namespace": "SourceVariables",
  "runOrder": 1
}`,
    },
    {
      id: 'source-s3',
      title: 'S3 object',
      lang: 'json',
      code: `{
  "name": "S3Source",
  "actionTypeId": {
    "category": "Source",
    "owner": "AWS",
    "provider": "S3",
    "version": "1"
  },
  "configuration": {
    "S3Bucket": "source-bucket",
    "S3ObjectKey": "releases/app.zip",
    "PollForSourceChanges": "false"
  },
  "outputArtifacts": [{ "name": "SourceArtifact" }],
  "runOrder": 1
}`,
    },
    {
      id: 'source-ecr',
      title: 'ECR image',
      note: 'The output artifact contains imageDetail.json for an ECS blue/green deployment.',
      lang: 'json',
      code: `{
  "name": "ECRSource",
  "actionTypeId": {
    "category": "Source",
    "owner": "AWS",
    "provider": "ECR",
    "version": "1"
  },
  "configuration": {
    "RepositoryName": "app",
    "ImageTag": "production"
  },
  "outputArtifacts": [{ "name": "ImageArtifact" }],
  "namespace": "ImageVariables",
  "runOrder": 1
}`,
    },
  ],
};

const build: Group = {
  id: 'build',
  title: 'Build and test',
  blurb: 'Run CodeBuild and pass files or variables to later stages.',
  snippets: [
    {
      id: 'build-node',
      title: 'Node.js application',
      lang: 'yaml',
      code: `version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 22
    commands:
      - npm ci
  pre_build:
    commands:
      - npm test
  build:
    commands:
      - npm run build

artifacts:
  base-directory: dist
  files:
    - "**/*"

cache:
  paths:
    - "/root/.npm/**/*"`,
    },
    {
      id: 'build-action',
      title: 'CodeBuild action',
      lang: 'json',
      code: `{
  "name": "Build",
  "actionTypeId": {
    "category": "Build",
    "owner": "AWS",
    "provider": "CodeBuild",
    "version": "1"
  },
  "configuration": {
    "ProjectName": "app",
    "EnvironmentVariables": "[{\\\"name\\\":\\\"STAGE\\\",\\\"value\\\":\\\"production\\\",\\\"type\\\":\\\"PLAINTEXT\\\"}]"
  },
  "inputArtifacts": [{ "name": "SourceArtifact" }],
  "outputArtifacts": [{ "name": "BuildArtifact" }],
  "namespace": "BuildVariables",
  "runOrder": 1
}`,
    },
    {
      id: 'build-variables',
      title: 'Export variables',
      lang: 'yaml',
      code: `version: 0.2

env:
  exported-variables:
    - IMAGE_TAG
    - TARGET_VERSION

phases:
  build:
    commands:
      - IMAGE_TAG=$(echo "$CODEBUILD_RESOLVED_SOURCE_VERSION" | cut -c 1-12)
      - TARGET_VERSION=$(aws lambda publish-version --function-name app --query Version --output text)`,
    },
  ],
};

const lambda: Group = {
  id: 'lambda',
  title: 'Lambda',
  blurb: 'Deploy source or a CodeBuild artifact directly with the Lambda deploy action.',
  snippets: [
    {
      id: 'lambda-package',
      title: 'Build artifact',
      lang: 'yaml',
      code: `version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 22
    commands:
      - npm ci
  build:
    commands:
      - npm test
      - npm prune --omit=dev

artifacts:
  files:
    - index.mjs
    - package.json
    - node_modules/**/*`,
    },
    {
      id: 'lambda-direct-action',
      title: 'Deploy source directly',
      note: 'The handler and production dependencies must be at the artifact root.',
      lang: 'json',
      code: `{
  "name": "DeployLambda",
  "actionTypeId": {
    "category": "Deploy",
    "owner": "AWS",
    "provider": "Lambda",
    "version": "1"
  },
  "configuration": {
    "FunctionName": "app"
  },
  "inputArtifacts": [{ "name": "SourceArtifact" }],
  "namespace": "LambdaDeploy",
  "runOrder": 1
}`,
    },
    {
      id: 'lambda-deploy-action',
      title: 'Canary deployment',
      note: 'Use a V2 pipeline. The function, a published version, and the live alias must already exist.',
      lang: 'json',
      code: `{
  "name": "DeployLambda",
  "actionTypeId": {
    "category": "Deploy",
    "owner": "AWS",
    "provider": "Lambda",
    "version": "1"
  },
  "configuration": {
    "FunctionName": "app",
    "FunctionAlias": "live",
    "DeployStrategy": "Canary10Percent5Minutes",
    "Alarms": "app-errors,app-duration"
  },
  "inputArtifacts": [{ "name": "BuildArtifact" }],
  "namespace": "LambdaDeploy",
  "runOrder": 1
}`,
    },
    {
      id: 'lambda-codedeploy-appspec',
      title: 'Legacy CodeDeploy AppSpec',
      note: 'Create a CodeDeploy application with the AWS Lambda compute platform and a deployment group, then paste this as the AppSpec revision. Replace both versions for each deployment.',
      lang: 'yaml',
      code: `version: 0.0
Resources:
  - Function:
      Type: AWS::Lambda::Function
      Properties:
        Name: app
        Alias: live
        CurrentVersion: "1"
        TargetVersion: "2"`,
    },
    {
      id: 'lambda-codedeploy-buildspec',
      title: 'Legacy CodeDeploy from CodeBuild',
      note: 'Use this in a deployment CodeBuild project. It publishes the artifact, creates the AppSpec dynamically, starts CodeDeploy, and waits for completion.',
      lang: 'yaml',
      code: `version: 0.2

phases:
  build:
    commands:
      - CURRENT_VERSION=$(aws lambda get-alias --function-name app --name live --query FunctionVersion --output text)
      - zip -qr /tmp/function.zip .
      - TARGET_VERSION=$(aws lambda update-function-code --function-name app --zip-file fileb:///tmp/function.zip --publish --query Version --output text)
      - aws lambda wait function-updated-v2 --function-name app
      - >-
        APPSPEC=$(jq -nc
        --arg current "$CURRENT_VERSION"
        --arg target "$TARGET_VERSION"
        '{version:0.0,Resources:[{Function:{Type:"AWS::Lambda::Function",Properties:{Name:"app",Alias:"live",CurrentVersion:$current,TargetVersion:$target}}}]}')
      - REVISION=$(jq -nc --arg content "$APPSPEC" '{revisionType:"AppSpecContent",appSpecContent:{content:$content}}')
      - DEPLOYMENT_ID=$(aws deploy create-deployment --application-name app --deployment-group-name production --deployment-config-name CodeDeployDefault.LambdaCanary10Percent5Minutes --revision "$REVISION" --query deploymentId --output text)
      - aws deploy wait deployment-successful --deployment-id "$DEPLOYMENT_ID"`,
    },
    {
      id: 'lambda-codedeploy-action',
      title: 'Legacy CodeDeploy pipeline action',
      note: 'The lambda-codedeploy CodeBuild project uses the preceding buildspec and receives the packaged Lambda artifact.',
      lang: 'json',
      code: `{
  "name": "DeployLambdaWithCodeDeploy",
  "actionTypeId": {
    "category": "Build",
    "owner": "AWS",
    "provider": "CodeBuild",
    "version": "1"
  },
  "configuration": {
    "ProjectName": "lambda-codedeploy"
  },
  "inputArtifacts": [{ "name": "BuildArtifact" }],
  "runOrder": 1
}`,
    },
  ],
};

const containers: Group = {
  id: 'containers',
  title: 'ECR and ECS',
  blurb: 'Build images, push them to ECR, and deploy them to ECS.',
  snippets: [
    {
      id: 'ecr-managed-build',
      title: 'Managed ECR build action',
      note: 'ECRBuildAndPublish is available in V2 pipelines and does not require a buildspec.',
      lang: 'json',
      code: `{
  "name": "BuildImage",
  "actionTypeId": {
    "category": "Build",
    "owner": "AWS",
    "provider": "ECRBuildAndPublish",
    "version": "1"
  },
  "configuration": {
    "ECRRepositoryName": "app",
    "DockerFilePath": "Dockerfile",
    "ImageTags": "latest,#{SourceVariables.CommitId}",
    "RegistryType": "private"
  },
  "inputArtifacts": [{ "name": "SourceArtifact" }],
  "namespace": "ImageBuild",
  "runOrder": 1
}`,
    },
    {
      id: 'ecs-buildspec',
      title: 'Build image and create imagedefinitions.json',
      note: 'Enable privileged mode on the CodeBuild project.',
      lang: 'yaml',
      code: `version: 0.2

phases:
  pre_build:
    commands:
      - ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
      - REPOSITORY_URI="$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/app"
      - IMAGE_TAG=$(echo "$CODEBUILD_RESOLVED_SOURCE_VERSION" | cut -c 1-12)
      - aws ecr get-login-password | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
  build:
    commands:
      - docker build --pull -t "$REPOSITORY_URI:$IMAGE_TAG" .
  post_build:
    commands:
      - docker push "$REPOSITORY_URI:$IMAGE_TAG"
      - printf '[{"name":"app","imageUri":"%s"}]' "$REPOSITORY_URI:$IMAGE_TAG" > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json`,
    },
    {
      id: 'ecs-standard',
      title: 'ECS rolling deployment',
      lang: 'json',
      code: `{
  "name": "DeployECS",
  "actionTypeId": {
    "category": "Deploy",
    "owner": "AWS",
    "provider": "ECS",
    "version": "1"
  },
  "configuration": {
    "ClusterName": "app",
    "ServiceName": "app",
    "FileName": "imagedefinitions.json",
    "DeploymentTimeout": "15"
  },
  "inputArtifacts": [{ "name": "BuildArtifact" }],
  "runOrder": 1
}`,
    },
    {
      id: 'ecs-bluegreen-build',
      title: 'Build artifact for ECS blue/green',
      note: 'Enable privileged mode on the CodeBuild project.',
      lang: 'yaml',
      code: `version: 0.2

phases:
  pre_build:
    commands:
      - ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
      - REPOSITORY_URI="$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/app"
      - IMAGE_TAG=$(echo "$CODEBUILD_RESOLVED_SOURCE_VERSION" | cut -c 1-12)
      - aws ecr get-login-password | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
  build:
    commands:
      - docker build --pull -t "$REPOSITORY_URI:$IMAGE_TAG" .
  post_build:
    commands:
      - docker push "$REPOSITORY_URI:$IMAGE_TAG"
      - printf '{"ImageURI":"%s"}' "$REPOSITORY_URI:$IMAGE_TAG" > imageDetail.json

artifacts:
  files:
    - imageDetail.json
    - taskdef.json
    - appspec.yaml`,
    },
    {
      id: 'ecs-taskdef',
      title: 'Blue/green task definition',
      lang: 'json',
      code: `{
  "family": "app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::111122223333:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "app",
      "image": "<IMAGE1_NAME>",
      "essential": true,
      "portMappings": [
        { "containerPort": 8080, "protocol": "tcp" }
      ]
    }
  ]
}`,
    },
    {
      id: 'ecs-appspec',
      title: 'ECS AppSpec',
      lang: 'yaml',
      code: `version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: <TASK_DEFINITION>
        LoadBalancerInfo:
          ContainerName: app
          ContainerPort: 8080
        PlatformVersion: LATEST`,
    },
    {
      id: 'ecs-bluegreen-action',
      title: 'ECS blue/green CodeDeploy action',
      lang: 'json',
      code: `{
  "name": "BlueGreen",
  "actionTypeId": {
    "category": "Deploy",
    "owner": "AWS",
    "provider": "CodeDeployToECS",
    "version": "1"
  },
  "configuration": {
    "ApplicationName": "app",
    "DeploymentGroupName": "app-production",
    "TaskDefinitionTemplateArtifact": "BuildArtifact",
    "TaskDefinitionTemplatePath": "taskdef.json",
    "AppSpecTemplateArtifact": "BuildArtifact",
    "AppSpecTemplatePath": "appspec.yaml",
    "Image1ArtifactName": "BuildArtifact",
    "Image1ContainerName": "IMAGE1_NAME"
  },
  "inputArtifacts": [{ "name": "BuildArtifact" }],
  "runOrder": 1
}`,
    },
  ],
};

const ec2: Group = {
  id: 'ec2',
  title: 'EC2 with CodeDeploy',
  blurb: 'Deploy an application revision to EC2 instances or an Auto Scaling group.',
  snippets: [
    {
      id: 'ec2-appspec',
      title: 'AppSpec',
      lang: 'yaml',
      code: `version: 0.0
os: linux
files:
  - source: /
    destination: /opt/app
file_exists_behavior: OVERWRITE
permissions:
  - object: /opt/app
    owner: app
    group: app
    mode: 755
    type:
      - directory
  - object: /opt/app/scripts/deploy.sh
    owner: app
    group: app
    mode: 755
    type:
      - file
hooks:
  AfterInstall:
    - location: scripts/deploy.sh
      timeout: 300
      runas: root`,
    },
    {
      id: 'ec2-hooks',
      title: 'Deployment hook',
      lang: 'bash',
      code: `systemctl stop app || true
npm ci --omit=dev --prefix /opt/app
systemctl restart app
curl --fail --retry 10 --retry-delay 2 http://127.0.0.1:8080/health`,
    },
    {
      id: 'ec2-action',
      title: 'CodeDeploy action',
      lang: 'json',
      code: `{
  "name": "DeployEC2",
  "actionTypeId": {
    "category": "Deploy",
    "owner": "AWS",
    "provider": "CodeDeploy",
    "version": "1"
  },
  "configuration": {
    "ApplicationName": "app",
    "DeploymentGroupName": "production"
  },
  "inputArtifacts": [{ "name": "SourceArtifact" }],
  "runOrder": 1
}`,
    },
  ],
};

const otherDeployments: Group = {
  id: 'other-deployments',
  title: 'Other deployments',
  blurb: 'Deploy infrastructure and static artifacts.',
  snippets: [
    {
      id: 'cloudformation-action',
      title: 'CloudFormation create or update',
      lang: 'json',
      code: `{
  "name": "DeployStack",
  "actionTypeId": {
    "category": "Deploy",
    "owner": "AWS",
    "provider": "CloudFormation",
    "version": "1"
  },
  "configuration": {
    "ActionMode": "CREATE_UPDATE",
    "StackName": "app",
    "TemplatePath": "SourceArtifact::template.yaml",
    "Capabilities": "CAPABILITY_NAMED_IAM,CAPABILITY_AUTO_EXPAND",
    "RoleArn": "arn:aws:iam::111122223333:role/cloudformation-app",
    "ParameterOverrides": "{\\\"Stage\\\":\\\"production\\\",\\\"ImageTag\\\":\\\"#{BuildVariables.IMAGE_TAG}\\\"}"
  },
  "inputArtifacts": [{ "name": "SourceArtifact" }],
  "runOrder": 1
}`,
    },
    {
      id: 's3-action',
      title: 'S3 static files',
      lang: 'json',
      code: `{
  "name": "DeployWebsite",
  "actionTypeId": {
    "category": "Deploy",
    "owner": "AWS",
    "provider": "S3",
    "version": "1"
  },
  "configuration": {
    "BucketName": "app.example.com",
    "Extract": "true"
  },
  "inputArtifacts": [{ "name": "BuildArtifact" }],
  "runOrder": 1
}`,
    },
    {
      id: 'approval-action',
      title: 'Manual approval with SNS',
      lang: 'json',
      code: `{
  "name": "ApproveProduction",
  "actionTypeId": {
    "category": "Approval",
    "owner": "AWS",
    "provider": "Manual",
    "version": "1"
  },
  "configuration": {
    "NotificationArn": "arn:aws:sns:eu-central-1:111122223333:pipeline-approvals",
    "CustomData": "Review production deployment",
    "ExternalEntityLink": "https://example.com/releases/#{codepipeline.PipelineExecutionId}"
  },
  "runOrder": 1
}`,
    },
  ],
};

const permissions: Group = {
  id: 'permissions',
  title: 'Permissions',
  blurb: 'Starter policies for the pipeline and image build roles.',
  snippets: [
    {
      id: 'codedeploy-lambda-role',
      title: 'Lambda CodeDeploy service role',
      note: 'Attach the AWSCodeDeployRoleForLambda managed policy to this role and select it on the Lambda deployment group.',
      lang: 'json',
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "codedeploy.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}`,
    },
    {
      id: 'lambda-codedeploy-build-policy',
      title: 'Legacy Lambda deployment build role',
      note: 'Add this policy to the normal CodeBuild service role used by the deployment project.',
      lang: 'json',
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:GetAlias",
        "lambda:GetFunction",
        "lambda:UpdateFunctionCode",
        "lambda:PublishVersion"
      ],
      "Resource": [
        "arn:aws:lambda:eu-central-1:111122223333:function:app",
        "arn:aws:lambda:eu-central-1:111122223333:function:app:*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["codedeploy:CreateDeployment", "codedeploy:GetDeployment"],
      "Resource": "*"
    }
  ]
}`,
    },
    {
      id: 'pipeline-policy',
      title: 'CodePipeline service role',
      note: 'Replace the resources and remove actions not used by the pipeline.',
      lang: 'json',
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:GetObjectVersion", "s3:PutObject", "s3:GetBucketVersioning"],
      "Resource": [
        "arn:aws:s3:::codepipeline-eu-central-1-111122223333",
        "arn:aws:s3:::codepipeline-eu-central-1-111122223333/*",
        "arn:aws:s3:::source-bucket",
        "arn:aws:s3:::source-bucket/*",
        "arn:aws:s3:::app.example.com/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["codeconnections:UseConnection", "codestar-connections:UseConnection"],
      "Resource": "arn:aws:codeconnections:eu-central-1:111122223333:connection/CONNECTION_ID"
    },
    {
      "Effect": "Allow",
      "Action": ["codebuild:StartBuild", "codebuild:BatchGetBuilds"],
      "Resource": "arn:aws:codebuild:eu-central-1:111122223333:project/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codedeploy:CreateDeployment",
        "codedeploy:GetApplication",
        "codedeploy:GetApplicationRevision",
        "codedeploy:RegisterApplicationRevision",
        "codedeploy:GetDeployment",
        "codedeploy:GetDeploymentConfig"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ecr:GetAuthorizationToken",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:DescribeRepositories",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload",
        "ecr:PutImage"
      ],
      "Resource": "arn:aws:ecr:eu-central-1:111122223333:repository/app"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:DescribeServices",
        "ecs:DescribeTaskDefinition",
        "ecs:RegisterTaskDefinition",
        "ecs:TagResource",
        "ecs:UpdateService",
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration",
        "lambda:GetProvisionedConcurrencyConfig",
        "lambda:UpdateFunctionCode",
        "lambda:PublishVersion",
        "lambda:GetAlias",
        "lambda:UpdateAlias",
        "cloudwatch:DescribeAlarms",
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "cloudformation:CreateStack",
        "cloudformation:UpdateStack",
        "cloudformation:DescribeStacks",
        "cloudformation:DescribeStackEvents",
        "cloudformation:DescribeStackResources"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": [
        "arn:aws:iam::111122223333:role/ecsTaskExecutionRole",
        "arn:aws:iam::111122223333:role/cloudformation-app"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "arn:aws:sns:eu-central-1:111122223333:pipeline-approvals"
    }
  ]
}`,
    },
    {
      id: 'build-policy',
      title: 'CodeBuild ECR role',
      lang: 'json',
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "arn:aws:logs:eu-central-1:111122223333:log-group:/aws/codebuild/*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:GetObjectVersion", "s3:PutObject"],
      "Resource": "arn:aws:s3:::codepipeline-eu-central-1-111122223333/*"
    },
    {
      "Effect": "Allow",
      "Action": "ecr:GetAuthorizationToken",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload",
        "ecr:PutImage"
      ],
      "Resource": "arn:aws:ecr:eu-central-1:111122223333:repository/app"
    }
  ]
}`,
    },
  ],
};

export const groups: Group[] = [
  pipeline,
  sources,
  build,
  lambda,
  containers,
  ec2,
  otherDeployments,
  permissions,
];

export default groups;
