import { createHighlighter } from 'shiki';
import dracula from 'shiki/themes/dracula.mjs';
import type { PageServerLoad } from './$types';

import diagnostic from './snippets/diagnostic.mjs?raw';
import index from './snippets/index.mjs?raw';
import interceptor from './snippets/interceptor.mjs?raw';
import streamAnalyzer from './snippets/stream-analyzer.mjs?raw';
import iamPolicy from './snippets/iam-policy.json?raw';
import deploy from './snippets/deploy.sh?raw';
import databaseIndex from './snippets/database-index.mjs?raw';
import databaseWorkbench from './snippets/database-workbench.mjs?raw';
import databaseConnections from './snippets/database-connections.json?raw';
import databaseIam from './snippets/database-iam-policy.json?raw';
import databaseCallerIam from './snippets/database-caller-policy.json?raw';
import databaseDeploy from './snippets/database-deploy.sh?raw';
import ecrIndex from './snippets/ecr-index.mjs?raw';
import ecrManager from './snippets/ecr-manager.mjs?raw';
import ecrBuildspec from './snippets/ecr-buildspec.yml?raw';
import ecrCodeBuildProject from './snippets/ecr-codebuild-project.json?raw';
import ecrLambdaIam from './snippets/ecr-lambda-iam.json?raw';
import ecrCodeBuildIam from './snippets/ecr-codebuild-iam.json?raw';
import ecrDeploy from './snippets/ecr-deploy.sh?raw';

export const prerender = true;
export const trailingSlash = 'always';

const groups = [
  {
    id: 'event-diagnostics',
    title: 'Event diagnostics',
    blurb: 'Log and inspect Lambda events through /web.',
    snippets: [
      {
        id: 'diagnostic-index',
        title: 'Handler',
        filename: 'index.mjs',
        lang: 'javascript',
        code: index,
      },
      {
        id: 'diagnostic-addon',
        title: 'Diagnostics',
        filename: 'diagnostic.mjs',
        lang: 'javascript',
        code: diagnostic,
      },
      {
        id: 'diagnostic-iam',
        title: 'IAM policy',
        filename: 'iam-policy.json',
        lang: 'json',
        code: iamPolicy,
      },
      {
        id: 'diagnostic-deploy',
        title: 'Deployment',
        filename: 'deploy.sh',
        lang: 'bash',
        code: deploy,
      },
    ],
  },
  {
    id: 'http-interceptor',
    title: 'HTTP interceptor',
    blurb: 'Forward API Gateway and Function URL requests to another HTTP service.',
    snippets: [
      {
        id: 'interceptor-handler',
        title: 'Interceptor',
        filename: 'interceptor.mjs',
        lang: 'javascript',
        code: interceptor,
      },
    ],
  },
  {
    id: 'stream-analyzer',
    title: 'SQS and Kinesis analyzer',
    blurb: 'Inspect individual SQS and Kinesis records through /web?mode=streams.',
    snippets: [
      {
        id: 'stream-handler',
        title: 'Analyzer',
        filename: 'stream-analyzer.mjs',
        lang: 'javascript',
        code: streamAnalyzer,
      },
    ],
  },
  {
    id: 'database-workbench',
    title: 'Database workbench',
    blurb: 'Run database operations through /web and generate Lambda invocation code.',
    snippets: [
      {
        id: 'database-index',
        title: 'Handler',
        filename: 'database-index.mjs',
        lang: 'javascript',
        code: databaseIndex,
      },
      {
        id: 'database-addon',
        title: 'Database workbench',
        filename: 'database-workbench.mjs',
        lang: 'javascript',
        code: databaseWorkbench,
      },
      {
        id: 'database-connections',
        title: 'Connections',
        filename: 'database-connections.json',
        lang: 'json',
        code: databaseConnections,
      },
      {
        id: 'database-execution-iam',
        title: 'IAM policy',
        filename: 'database-iam-policy.json',
        lang: 'json',
        code: databaseIam,
      },
      {
        id: 'database-caller-iam',
        title: 'Caller IAM policy',
        filename: 'database-caller-policy.json',
        lang: 'json',
        code: databaseCallerIam,
      },
      {
        id: 'database-deploy',
        title: 'Deployment',
        filename: 'database-deploy.sh',
        lang: 'bash',
        code: databaseDeploy,
      },
    ],
  },
  {
    id: 'ecr-manager',
    title: 'ECR manager',
    blurb: 'Manage ECR repositories and images through /web. Image builds run in CodeBuild.',
    snippets: [
      {
        id: 'ecr-index',
        title: 'Handler',
        filename: 'ecr-index.mjs',
        lang: 'javascript',
        code: ecrIndex,
      },
      {
        id: 'ecr-addon',
        title: 'ECR manager',
        filename: 'ecr-manager.mjs',
        lang: 'javascript',
        code: ecrManager,
      },
      {
        id: 'ecr-buildspec',
        title: 'Buildspec',
        filename: 'ecr-buildspec.yml',
        lang: 'yaml',
        code: ecrBuildspec,
      },
      {
        id: 'ecr-codebuild-project',
        title: 'CodeBuild project',
        filename: 'ecr-codebuild-project.json',
        lang: 'json',
        code: ecrCodeBuildProject,
      },
      {
        id: 'ecr-lambda-iam',
        title: 'Lambda IAM policy',
        filename: 'ecr-lambda-iam.json',
        lang: 'json',
        code: ecrLambdaIam,
      },
      {
        id: 'ecr-codebuild-iam',
        title: 'CodeBuild IAM policy',
        filename: 'ecr-codebuild-iam.json',
        lang: 'json',
        code: ecrCodeBuildIam,
      },
      {
        id: 'ecr-deploy',
        title: 'Deployment',
        filename: 'ecr-deploy.sh',
        lang: 'bash',
        code: ecrDeploy,
      },
    ],
  },
];

export const load: PageServerLoad = async () => {
  const highlighter = await createHighlighter({
    themes: [dracula],
    langs: ['javascript', 'json', 'bash', 'yaml'],
  });

  return {
    groups: groups.map(group => ({
      ...group,
      snippets: group.snippets.map(snippet => ({
        ...snippet,
        html: highlighter.codeToHtml(snippet.code, {
          lang: snippet.lang,
          theme: 'dracula',
        }),
      })),
    })),
  };
};
