interface Concept {
  title: string;
  description: string;
  published: string;
  image: string;
}

const concepts: Record<string, Concept> = {
  'auth-standard-matrjoschka': {
    title: 'Auth Standard Matrjoschka',
    description: 'Some auth implementation patterns to use on top of OpenID Connect',
    published: '15.09.2025',
    image: 'auth-standard-matrjoschka.svg',
  },
  'cooking-lock': {
    title: 'Cooking Lock',
    description:
      "You need an simple, unfair and time-released lock that doesn't require an atomic swap? Use the cooking lock.",
    published: '06.01.2025',
    image: 'cooking-lock.webp',
  },
};

export default concepts;
