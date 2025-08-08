import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'profile' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Shivasai Nadigadda - Software Engineer | IIT Kharagpur',
  description = 'Experienced Software Engineer from IIT Kharagpur specializing in full-stack development, React, Node.js, and modern web technologies. View my portfolio showcasing innovative projects and professional experience.',
  keywords = [
    'Software Engineer',
    'Full Stack Developer', 
    'React Developer',
    'Node.js Developer',
    'IIT Kharagpur',
    'JavaScript',
    'TypeScript',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'Shivasai Nadigadda'
  ],
  image = '/profile-placeholder.jpeg',
  url = 'https://shivasaikgp.dev',
  type = 'profile',
  author = 'Shivasai Nadigadda',
  publishedTime,
  modifiedTime,
  section = 'Portfolio'
}) => {
  const fullTitle = title.includes('Shivasai') ? title : `${title} | Shivasai Nadigadda`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  const keywordsString = keywords.join(', ');

  // Structured data for rich snippets
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shivasai Nadigadda',
    jobTitle: 'Software Engineer',
    description: description,
    url: url,
    image: fullImageUrl,
    sameAs: [
      'https://github.com/Shivasaikgp',
      'https://www.linkedin.com/in/nadigadda-shiva-s-a40475129/',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Technology Kharagpur',
      sameAs: 'https://www.iitkgp.ac.in/'
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
      'Backend Development'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: {
        '@type': 'Country',
        name: 'India'
      },
      skills: keywords
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={`${author} - Software Engineer Portfolio`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Shivasai Nadigadda Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Profile specific Open Graph tags */}
      {type === 'profile' && (
        <>
          <meta property="profile:first_name" content="Shivasai" />
          <meta property="profile:last_name" content="Nadigadda" />
          <meta property="profile:username" content="shivasaikgp" />
        </>
      )}
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
          {keywords.map((keyword, index) => (
            <meta key={index} property="article:tag" content={keyword} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${author} - Software Engineer Portfolio`} />
      <meta name="twitter:creator" content="@shivasaikgp" />
      <meta name="twitter:site" content="@shivasaikgp" />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="msapplication-TileColor" content="#1e3a8a" />
      <meta name="application-name" content="Shivasai Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Shivasai Portfolio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={fullImageUrl} as="image" />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
      
      {/* Preconnect for critical external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;