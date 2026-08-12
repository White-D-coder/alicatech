import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Simple HTML entity decode helper for SSG build
function decodeHtmlEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => {
      const map = {
        amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
        hellip: '…', mdash: '—', ndash: '–', nbsp: ' ',
        rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”'
      };
      return map[name] ?? m;
    });
}

function stripHtml(html) {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

async function run() {
  console.log('Starting static site pre-rendering (SSG)...');

  // 1. Get the HTML template
  const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');

  // 2. Load the server entry's render function
  const { render } = await import('./dist/server/entry-server.js');

  // 3. Define all static core pages to prerender
  const routes = [
    {
      url: '/',
      title: 'Alica Technologies LLP | Electronic Manufacturing Services (EMS)',
      description: 'Alica Technologies LLP is a trusted Electronic Manufacturing Services (EMS) company specializing in PCB assembly, rapid prototyping, and turnkey manufacturing.'
    },
    {
      url: '/about',
      title: 'About Us | Alica Technologies LLP',
      description: 'Learn about Alica Technologies LLP, our mission, leadership, and our commitment to quality in Electronic Manufacturing Services (EMS).'
    },
    {
      url: '/smt-tht-pcb-assembly',
      title: 'SMT & THT PCB Assembly Services | Alica Technologies LLP',
      description: 'High-quality SMT and THT PCB assembly services at Alica Technologies LLP, offering rapid prototyping and production runs.'
    },
    {
      url: '/testing-inspection',
      title: 'Testing & Inspection Services | Alica Technologies LLP',
      description: 'Complete PCB testing and inspection services at Alica Technologies LLP including AOI, X-ray, and functional testing.'
    },
    {
      url: '/turnkey-project-delivery',
      title: 'Turnkey Project Delivery | Alica Technologies LLP',
      description: 'End-to-end turnkey project delivery and electronic contract manufacturing services at Alica Technologies LLP.'
    },
    {
      url: '/end-to-end-electronic-manufacturing',
      title: 'End-to-End Electronic Manufacturing | Alica Technologies LLP',
      description: 'Alica Technologies LLP provides comprehensive end-to-end electronic design, components sourcing, manufacturing, and testing services.'
    },
    {
      url: '/capabilities',
      title: 'Our Manufacturing Capabilities | Alica Technologies LLP',
      description: 'Discover our advanced manufacturing facilities, machinery, capabilities, and capacity for electronic assembly.'
    },
    {
      url: '/industries',
      title: 'Industries We Serve | Alica Technologies LLP',
      description: 'We provide specialized electronic manufacturing services across industries including automotive, aerospace, medical, and industrial electronics.'
    },
    {
      url: '/contact',
      title: 'Contact Us | Alica Technologies LLP',
      description: 'Get in touch with Alica Technologies LLP for quotes, technical support, or business inquiries.'
    },
    {
      url: '/blogs',
      title: 'Latest Blogs & News | Alica Technologies LLP',
      description: 'Read our latest articles, insights, and news updates on electronic manufacturing, PCB technology, and EMS trends.'
    }
  ];

  // 4. Fetch dynamic blog posts from WordPress REST API to prerender individual pages
  console.log('Fetching dynamic blog posts from WordPress REST API...');
  try {
    const res = await fetch('https://alicatechnologies.com/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia');
    if (res.ok) {
      const posts = await res.json();
      console.log(`Successfully fetched ${posts.length} posts for SSG prerendering.`);
      
      posts.forEach((post) => {
        const title = stripHtml(post.title.rendered);
        const excerpt = stripHtml(post.excerpt.rendered);
        const description = excerpt.length > 155 ? excerpt.slice(0, 155) + '...' : excerpt;
        
        // Extract featured image
        const media = post._embedded?.['wp:featuredmedia']?.[0];
        const imageUrl = media?.media_details?.sizes?.large?.source_url 
          || media?.media_details?.sizes?.full?.source_url 
          || media?.source_url 
          || '';

        routes.push({
          url: `/${post.slug}`,
          title: `${title} | Alica Technologies LLP`,
          description: description,
          image: imageUrl,
          type: 'article'
        });
      });
    } else {
      console.warn(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error('Error fetching blog posts for SSG:', err.message);
  }

  // 5. Prerender each route...
  for (const route of routes) {
    const appHtml = render(route.url);

    // Replace the SSR placeholder with the pre-rendered HTML
    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Clean up generic placeholders in template to avoid duplicates
    html = html.replace(/<title>.*?<\/title>/, '');
    html = html.replace(/<meta name="description"[^>]*>/g, '');
    html = html.replace(/<meta property="og:[^>]*>/g, '');
    html = html.replace(/<meta name="twitter:[^>]*>/g, '');
    html = html.replace(/<link rel="canonical"[^>]*>/g, '');

    // Construct full set of dynamic SEO meta tags
    const metaBlock = `
    <title>${route.title}</title>
    <meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="https://alicatechnologies.com${route.url}" />
    <meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="${route.image || 'https://alicatechnologies.com/Alica-green.svg'}" />
    <meta property="og:url" content="https://alicatechnologies.com${route.url}" />
    <meta property="og:type" content="${route.type || 'website'}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${route.image || 'https://alicatechnologies.com/Alica-green.svg'}" />
    `;

    // Inject before </head>
    html = html.replace('</head>', `${metaBlock}\n</head>`);

    const filePaths = [];
    if (route.url === '/') {
      filePaths.push('dist/client/index.html');
    } else {
      // Write both clean-url (.html) and trailing-slash (/index.html) files to be 100% compatible
      // with any hosting server routing/redirect configurations.
      filePaths.push(`dist/client${route.url}.html`);
      filePaths.push(`dist/client${route.url}/index.html`);
    }

    for (const filePath of filePaths) {
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(toAbsolute(filePath), html, 'utf-8');
      console.log(`Prerendered: ${route.url} -> ${filePath}`);
    }
  }

  // 6. Move everything from dist/client to dist, and clean up
  const copyFolderSync = (from, to) => {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach((element) => {
      const fromPath = path.join(from, element);
      const toPath = path.join(to, element);
      if (fs.lstatSync(fromPath).isDirectory()) {
        copyFolderSync(fromPath, toPath);
      } else {
        fs.copyFileSync(fromPath, toPath);
      }
    });
  };

  copyFolderSync(toAbsolute('dist/client'), toAbsolute('dist'));

  // Clean up temporary directories
  fs.rmSync(toAbsolute('dist/client'), { recursive: true, force: true });
  fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });

  console.log('Static site generation (SSG) complete! Files written to dist/');
}

run();
