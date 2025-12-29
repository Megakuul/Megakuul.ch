interface Project {
  description: string;
  published: string;
  services: string[];
}

const projects: Record<string, Project> = {
  'pipe-plumber': {
    description: 'Building a CI/CD pipeline to deploy this website 🪠',
    published: '30.12.2025',
    services: ['codepipeline', 's3', 'cloudfront', 'route53'],
  },
};

export default projects;
