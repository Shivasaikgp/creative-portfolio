// Structured data utilities for rich snippets and SEO

export interface PersonStructuredData {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  email?: string;
  telephone?: string;
  address?: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs: string[];
  alumniOf: {
    name: string;
    url: string;
  };
  worksFor?: Array<{
    name: string;
    url?: string;
    startDate: string;
    endDate?: string;
    jobTitle: string;
  }>;
  knowsAbout: string[];
  skills: string[];
}

export interface ProjectStructuredData {
  name: string;
  description: string;
  url?: string;
  image: string;
  author: {
    name: string;
    url: string;
  };
  dateCreated: string;
  dateModified?: string;
  programmingLanguage: string[];
  applicationCategory: string;
  operatingSystem?: string[];
  softwareRequirements?: string[];
}

export interface WebsiteStructuredData {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    url: string;
  };
  inLanguage: string;
  copyrightYear: number;
  genre: string[];
  keywords: string[];
}

export class StructuredDataGenerator {
  /**
   * Generate Person structured data
   */
  static generatePersonData(data: PersonStructuredData): object {
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.name,
      jobTitle: data.jobTitle,
      description: data.description,
      url: data.url,
      image: {
        '@type': 'ImageObject',
        url: data.image,
        caption: `${data.name} - ${data.jobTitle}`
      },
      sameAs: data.sameAs,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: data.alumniOf.name,
        sameAs: data.alumniOf.url
      },
      knowsAbout: data.knowsAbout,
      hasOccupation: {
        '@type': 'Occupation',
        name: data.jobTitle,
        occupationLocation: data.address ? {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.address.addressLocality,
            addressRegion: data.address.addressRegion,
            addressCountry: data.address.addressCountry
          }
        } : undefined,
        skills: data.skills
      }
    };

    // Add contact information if provided
    if (data.email) {
      structuredData.email = data.email;
    }
    
    if (data.telephone) {
      structuredData.telephone = data.telephone;
    }

    // Add work experience if provided
    if (data.worksFor && data.worksFor.length > 0) {
      structuredData.worksFor = data.worksFor.map(work => ({
        '@type': 'Organization',
        name: work.name,
        url: work.url,
        employee: {
          '@type': 'Role',
          roleName: work.jobTitle,
          startDate: work.startDate,
          endDate: work.endDate
        }
      }));
    }

    return structuredData;
  }

  /**
   * Generate SoftwareApplication structured data for projects
   */
  static generateProjectData(data: ProjectStructuredData): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: data.name,
      description: data.description,
      url: data.url,
      image: {
        '@type': 'ImageObject',
        url: data.image,
        caption: `${data.name} - Project Screenshot`
      },
      author: {
        '@type': 'Person',
        name: data.author.name,
        url: data.author.url
      },
      dateCreated: data.dateCreated,
      dateModified: data.dateModified || data.dateCreated,
      programmingLanguage: data.programmingLanguage,
      applicationCategory: data.applicationCategory,
      operatingSystem: data.operatingSystem || ['Web Browser'],
      softwareRequirements: data.softwareRequirements,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    };
  }

  /**
   * Generate Website structured data
   */
  static generateWebsiteData(data: WebsiteStructuredData): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Website',
      name: data.name,
      description: data.description,
      url: data.url,
      author: {
        '@type': 'Person',
        name: data.author.name,
        url: data.author.url
      },
      inLanguage: data.inLanguage,
      copyrightYear: data.copyrightYear,
      genre: data.genre,
      keywords: data.keywords.join(', '),
      mainEntity: {
        '@type': 'Person',
        name: data.author.name,
        url: data.author.url
      }
    };
  }

  /**
   * Generate BreadcrumbList structured data
   */
  static generateBreadcrumbData(items: Array<{ name: string; url: string }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  /**
   * Generate Organization structured data for companies
   */
  static generateOrganizationData(data: {
    name: string;
    url: string;
    logo: string;
    description: string;
    foundingDate?: string;
    location?: {
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
    sameAs?: string[];
  }): object {
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      url: data.url,
      logo: {
        '@type': 'ImageObject',
        url: data.logo,
        caption: `${data.name} Logo`
      },
      description: data.description
    };

    if (data.foundingDate) {
      structuredData.foundingDate = data.foundingDate;
    }

    if (data.location) {
      structuredData.address = {
        '@type': 'PostalAddress',
        addressLocality: data.location.addressLocality,
        addressRegion: data.location.addressRegion,
        addressCountry: data.location.addressCountry
      };
    }

    if (data.sameAs) {
      structuredData.sameAs = data.sameAs;
    }

    return structuredData;
  }

  /**
   * Generate FAQ structured data
   */
  static generateFAQData(faqs: Array<{ question: string; answer: string }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }
}

// Default structured data for the portfolio
export const defaultPersonData: PersonStructuredData = {
  name: 'Shivasai Nadigadda',
  jobTitle: 'Software Engineer',
  description: 'Experienced Software Engineer from IIT Kharagpur specializing in full-stack development, React, Node.js, and modern web technologies.',
  url: 'https://shivasaikgp.dev',
  image: 'https://shivasaikgp.dev/profile-placeholder.jpeg',
  email: 'nadigaddashiva5@gmail.com',
  sameAs: [
    'https://github.com/Shivasaikgp',
    'https://www.linkedin.com/in/nadigadda-shiva-s-a40475129/'
  ],
  alumniOf: {
    name: 'Indian Institute of Technology Kharagpur',
    url: 'https://www.iitkgp.ac.in/'
  },
  knowsAbout: [
    'Software Engineering',
    'Full Stack Development',
    'React.js',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Web Development',
    'Frontend Development',
    'Backend Development',
    'Database Design',
    'System Architecture'
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Git',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'REST APIs',
    'GraphQL'
  ]
};

export const defaultWebsiteData: WebsiteStructuredData = {
  name: 'Shivasai Nadigadda - Portfolio',
  description: 'Professional portfolio showcasing software engineering projects, skills, and experience.',
  url: 'https://shivasaikgp.dev',
  author: {
    name: 'Shivasai Nadigadda',
    url: 'https://shivasaikgp.dev'
  },
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
  genre: ['Portfolio', 'Professional', 'Technology'],
  keywords: [
    'software engineer',
    'portfolio',
    'full stack developer',
    'react developer',
    'node.js developer',
    'IIT Kharagpur',
    'web development',
    'javascript',
    'typescript'
  ]
};