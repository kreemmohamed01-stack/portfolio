/* ============================================================
   PRICING DATA — Kreem Aly / pricing.html
   All copy, numbers and structure are content data only; the
   rendering logic lives in pricing.js. Edit prices/copy here.
   ============================================================ */

const PRICING_DATA = {

  websites: {
    kicker: "Invest In A Stronger Digital Presence",
    titleLine1: "Premium Solutions",
    titleLine2: "For Modern Brands",
    subtitle: "Choose the right package or create a custom solution. High-end design, real results, and ongoing support.",
    badges: [
      { icon: "diamond", label: "Modern &amp; Unique Design" },
      { icon: "bolt", label: "Built for Performance" },
      { icon: "shield", label: "Ongoing Support" },
      { icon: "chart", label: "Results That Matter" }
    ],
    eyebrow: "Website Packages",
    sectionTitle: "Find The Perfect Fit",
    sectionDesc: "Professional websites tailored to your goals, from simple sites to fully custom platforms.",
    compareWord: "Packages",
    compareDesc: "See what's included in each package.",
    compareLinkText: "View Full Comparison →",
    howItWorksDesc: "From idea to launch, a smooth and transparent process.",
    testimonialSub: "Real feedback. Real results.",

    plans: [
      {
        id: "web-starter",
        name: "Starter",
        tag: "",
        blurb: "Perfect for small businesses",
        price: 10000,
        monthlyPrice: null,
        currency: "EGP",
        cover: "photo",
        features: [
          "5 Pages Website",
          "Responsive Design",
          "Basic SEO Setup",
          "Contact Form",
          "Basic Animations"
        ],
        cta: "Add to Cart",
        highlight: false
      },
      {
        id: "web-premium",
        name: "Premium",
        tag: "MOST POPULAR",
        blurb: "For growing businesses",
        price: 18000,
        monthlyPrice: null,
        currency: "EGP",
        cover: "photo",
        features: [
          "Up to 20 Pages",
          "Advanced SEO Setup",
          "Custom Animations",
          "CMS (Easy to Manage)",
          "Integration (Forms, Maps, etc.)",
          "1 Month Free Support"
        ],
        cta: "Add to Cart",
        highlight: true
      },
      {
        id: "web-signature",
        name: "Signature",
        tag: "",
        blurb: "For established brands",
        price: 30000,
        monthlyPrice: null,
        currency: "EGP",
        cover: "photo",
        features: [
          "Unlimited Pages",
          "Custom UI/UX Design",
          "Advanced Integrations",
          "Performance Optimization",
          "3 Months Free Support",
          "Priority Support"
        ],
        cta: "Add to Cart",
        highlight: false
      },
      {
        id: "web-custom",
        name: "Custom",
        tag: "YOUR VISION OUR EXECUTION",
        blurb: "Tailored to your vision",
        price: null,
        priceLabel: "Let's Talk",
        currency: "",
        cover: "photo",
        features: [
          "Fully Custom Solution",
          "Scalable &amp; Future-Ready",
          "AI Integration (Optional)",
          "Dedicated Support",
          "Timeline Based on Your Needs"
        ],
        cta: "Request a Quote",
        highlight: false,
        isCustomCta: true
      }
    ],

    compare: {
      headers: ["Feature", "Starter", "Premium", "Signature"],
      rows: [
        ["Responsive Design", true, true, true],
        ["Pages", "Up to 5", "Up to 20", "Unlimited"],
        ["SEO Setup", "Basic", "Advanced", "Advanced"],
        ["Custom Design", false, true, true],
        ["CMS", false, true, true],
        ["Integrations", "Basic", "Advanced", "Advanced"],
        ["Support", "1 Week", "1 Month", "3 Months"],
        ["Priority Support", false, false, true]
      ]
    },

    howItWorks: [
      { icon: "package", title: "Choose a Package" },
      { icon: "cart", title: "Add to Cart &amp; Checkout" },
      { icon: "share", title: "Share Your Requirements" },
      { icon: "rocket", title: "We Build &amp; Deliver" }
    ],

    testimonials: [
      { quote: "Kareem delivered an amazing website for our brand. Professional, creative, and always on time. Highly recommended!", name: "Sara M.", role: "Founder, Luma Store" }
    ]
  },

  dashboards: {
    kicker: "Data Driven Growth",
    titleLine1: "Powerful Dashboards",
    titleLine2: "For Smarter Decisions",
    subtitle: "Custom dashboards designed to help you manage, analyze, and grow your business — all in one place.",
    badges: [
      { icon: "chart", label: "Real-Time Data" },
      { icon: "gear", label: "Custom Features" },
      { icon: "shield", label: "Secure &amp; Scalable" },
      { icon: "headset", label: "Ongoing Support" }
    ],
    eyebrow: "Dashboard Packages",
    sectionTitle: "Choose The Right Dashboard",
    sectionDesc: "Custom admin panels built to manage orders, products, and customers with ease.",
    compareWord: "Packages",
    compareDesc: "See what's included in each package.",
    compareLinkText: "View Full Comparison →",
    howItWorksDesc: "From idea to launch, a smooth and transparent process.",
    testimonialSub: "Real results. Real growth.",

    plans: [
      {
        id: "dash-starter",
        name: "Starter",
        tag: "",
        blurb: "Perfect for small businesses",
        price: 5000,
        currency: "EGP",
        cover: "photo",
        features: [
          "Basic Dashboard (Up to 5 Pages)",
          "View Orders &amp; Customers",
          "Basic Analytics",
          "Responsive Design",
          "1 Revision"
        ],
        cta: "Add to Cart",
        highlight: false
      },
      {
        id: "dash-premium",
        name: "Premium",
        tag: "MOST POPULAR",
        blurb: "For growing businesses",
        price: 12000,
        currency: "EGP",
        cover: "photo",
        features: [
          "Up to 15 Pages",
          "Advanced Analytics &amp; Reports",
          "Product &amp; Inventory Management",
          "Order &amp; Customer Management",
          "Role-Based Access",
          "Custom Design (Your Brand)",
          "1 Month Free Support"
        ],
        cta: "Add to Cart",
        highlight: true
      },
      {
        id: "dash-signature",
        name: "Signature",
        tag: "",
        blurb: "For established brands",
        price: 20000,
        currency: "EGP",
        cover: "photo",
        features: [
          "Unlimited Pages",
          "Advanced Analytics (Real-Time)",
          "Admin &amp; Staff Management",
          "Custom Features (APIs, etc.)",
          "Data Export (Excel, PDF)",
          "Advanced Security",
          "3 Months Free Support"
        ],
        cta: "Add to Cart",
        highlight: false
      },
      {
        id: "dash-custom",
        name: "Custom",
        tag: "",
        blurb: "Tailored to your needs",
        price: null,
        priceLabel: "Let's Talk",
        currency: "",
        cover: "photo",
        features: [
          "Fully Customized Dashboard",
          "Any Integrations You Need",
          "Advanced Automation",
          "Multi-Branch / Multi-Store",
          "Dedicated Support",
          "Scalable for Future Growth"
        ],
        cta: "Request a Quote",
        highlight: false,
        isCustomCta: true
      }
    ],

    compare: {
      headers: ["Feature", "Starter", "Premium", "Signature"],
      rows: [
        ["Dashboard Pages", "Up to 5", "Up to 15", "Unlimited"],
        ["Order Management", true, true, true],
        ["Product Management", "Basic", true, true],
        ["Customer Management", "Basic", true, true],
        ["Analytics &amp; Reports", "Basic", "Advanced", "Advanced (Real-Time)"],
        ["Admin Roles", false, true, true],
        ["Data Export", false, "PDF, Excel", "PDF, Excel, API"],
        ["Support", "1 Week", "1 Month", "3 Months"]
      ]
    },

    howItWorks: [
      { icon: "package", title: "Choose a Package" },
      { icon: "cart", title: "Add to Cart &amp; Checkout" },
      { icon: "share", title: "Share Your Requirements" },
      { icon: "rocket", title: "We Build &amp; Deliver" }
    ],

    testimonials: [
      { quote: "Kareem built our dashboard exactly as we imagined. It made managing our business so much easier. Highly recommended!", name: "Sara M.", role: "Founder, The Pink Room" }
    ]
  },

  ai: {
    kicker: "Automate. Engage. Convert. Grow",
    titleLine1: "Intelligent Solutions",
    titleLine2: "For Modern Brands",
    subtitle: "AI agents tailored to your business — help your customers, boost sales, and save time.",
    badges: [
      { icon: "chat", label: "24/7 Customer Support" },
      { icon: "chart", label: "Increases Sales" },
      { icon: "bolt", label: "Fully Customizable" },
      { icon: "shield", label: "Secure &amp; Reliable" }
    ],
    eyebrow: "AI Agent Packages",
    sectionTitle: "Choose The Right AI Solution",
    sectionDesc: "AI agents trained on your business to chat, recommend, and support customers around the clock.",
    compareWord: "Packages",
    compareDesc: "See what's included in each package.",
    compareLinkText: "View Full Comparison →",
    howItWorksDesc: "From idea to launch, a smooth and transparent process.",
    testimonialSub: "Real results. Real growth.",

    plans: [
      {
        id: "ai-starter",
        name: "Starter",
        tag: "",
        blurb: "Perfect for small businesses",
        price: 8000,
        currency: "EGP",
        cover: "robot",
        features: [
          "Basic AI Chatbot",
          "Trained on your website content",
          "FAQ &amp; Product Info",
          "Lead Collection (Email/Phone)",
          "Basic UI Customization",
          "1 Revision"
        ],
        cta: "Add to Cart",
        highlight: false
      },
      {
        id: "ai-premium",
        name: "Premium",
        tag: "Most Popular",
        blurb: "For growing businesses",
        price: 15000,
        currency: "EGP",
        cover: "robot",
        features: [
          "Advanced AI Agent",
          "Trained on your content &amp; files",
          "Product Recommendations",
          "Order Tracking Integration",
          "Multi-language Support (AR/EN)",
          "Custom Personality &amp; Tone",
          "Analytics Dashboard",
          "2 Revisions"
        ],
        cta: "Add to Cart",
        highlight: true
      },
      {
        id: "ai-signature",
        name: "Signature",
        tag: "",
        blurb: "For established brands",
        price: 25000,
        currency: "EGP",
        cover: "robot",
        features: [
          "Everything in Premium",
          "Advanced Integrations (CRM)",
          "Human Handover (Live Chat)",
          "Voice Support (Optional)",
          "Custom Workflows (Bookings, etc.)",
          "Advanced Analytics",
          "Priority Support",
          "3 Months Free Updates"
        ],
        cta: "Add to Cart",
        highlight: false
      },
      {
        id: "ai-custom",
        name: "Custom",
        tag: "",
        blurb: "Tailored to your needs",
        price: null,
        priceLabel: "Let's Talk",
        currency: "",
        cover: "robot",
        features: [
          "Fully Customized AI Solution",
          "Integration with any platform",
          "Advanced Automation",
          "Multi-Agent System",
          "Dedicated Account Manager",
          "Ongoing Development",
          "Scalable for Future Growth"
        ],
        cta: "Request a Quote",
        highlight: false,
        isCustomCta: true
      }
    ],

    compare: {
      headers: ["Feature", "Starter", "Premium", "Signature", "Custom"],
      rows: [
        ["Website Training", true, true, true, true],
        ["Product Recommendations", false, true, true, true],
        ["Order Tracking", false, true, true, true],
        ["Lead Collection", true, true, true, true],
        ["CRM Integration", false, false, true, true],
        ["Voice Support", false, false, true, true],
        ["Custom Workflows", false, false, true, true],
        ["Analytics Dashboard", "Basic", "Advanced", "Advanced", "Custom"],
        ["Support", "1 Week", "1 Month", "3 Months", "Dedicated"]
      ]
    },

    howItWorks: [
      { icon: "package", title: "Choose a Package" },
      { icon: "share", title: "Share Your Requirements" },
      { icon: "gear", title: "We Build &amp; Train" },
      { icon: "rocket", title: "Test &amp; Launch" }
    ],

    testimonials: [
      { quote: "The AI assistant changed the way we interact with our customers. It's fast, smart, and feels like part of our brand. Highly recommended!", name: "Sara M.", role: "Founder, OVA Perfume" }
    ]
  },

  addons: {
    kicker: "Extra Power For A Better Experience",
    titleLine1: "Add-On Services",
    titleLine2: "Take Your Website Further",
    subtitle: "Enhance your website, dashboard, or AI solution with powerful add-ons tailored to your needs.",
    badges: [
      { icon: "bolt", label: "Flexible Upgrades" },
      { icon: "gear", label: "Professional Implementation" },
      { icon: "truck", label: "Fast Delivery" },
      { icon: "headset", label: "Ongoing Support" }
    ],
    eyebrow: "Boost Your Project",
    sectionTitle: "Choose The Add-Ons You Need",
    sectionDesc: "Add extra features to your package and create the perfect solution.",
    compareWord: "Add-Ons",
    compareDesc: "See what each add-on brings to your project.",
    compareLinkText: "View All Features →",
    howItWorksDesc: "Add your desired services in a few simple steps.",
    testimonialSub: "Real feedback. Real results.",
    searchPlaceholder: "Search add-ons...",

    addonsGrid: [
      { id: "addon-landing", name: "Landing Page", icon: "layout", desc: "High-converting landing page designed to boost your sales.", price: 7000, priceSuffix: "" },
      { id: "addon-ai-agent", name: "AI Agent", icon: "robot", desc: "Smart AI assistant for your website or dashboard.", price: 8000, priceSuffix: "", priceLabelPrefix: "From " },
      { id: "addon-pages", name: "Extra Pages", icon: "pages", desc: "Add additional pages to your website.", price: 1500, priceSuffix: " / page" },
      { id: "addon-products", name: "Product Setup", icon: "bag", desc: "Add products to your store (with images &amp; details).", price: 50, priceSuffix: " / product" },
      { id: "addon-design", name: "Custom Design", icon: "brush", desc: "Fully customized sections or features.", price: 5000, priceSuffix: "", priceLabelPrefix: "From " },
      { id: "addon-seo", name: "SEO Optimization", icon: "bars", desc: "Get higher rankings and more visitors.", price: 4000, priceSuffix: "" },
      { id: "addon-speed", name: "Speed Optimization", icon: "bolt", desc: "Make your website faster and more efficient.", price: 3000, priceSuffix: "" },
      { id: "addon-maintenance", name: "Maintenance Plan", icon: "check-shield", desc: "Ongoing support and updates for peace of mind.", price: 1500, priceSuffix: " / month", priceLabelPrefix: "From " },
      { id: "addon-integrations", name: "Integrations", icon: "puzzle", desc: "Integrate with payment, CRM, or any third-party tool.", price: 3000, priceSuffix: "", priceLabelPrefix: "From " },
      { id: "addon-custom-feature", name: "Custom Feature", icon: "code", desc: "Have something specific in mind? We'll build it.", price: null, priceLabel: "Contact for Price", isCustomCta: true }
    ],

    compare: {
      headers: ["Feature", "Landing Page", "AI Agent", "SEO", "Speed", "Maintenance"],
      rows: [
        ["Boosts Sales", true, false, false, false, false],
        ["Improves SEO", true, false, true, false, false],
        ["Faster Performance", false, false, false, true, false],
        ["Automates Tasks", false, true, false, false, false],
        ["Ongoing Support", false, false, false, false, true],
        ["Customizable", true, true, true, true, true]
      ]
    },

    howItWorks: [
      { icon: "check", title: "Choose Add-Ons" },
      { icon: "cart", title: "Add to Cart" },
      { icon: "gear", title: "Review Your Order" },
      { icon: "bolt", title: "Checkout Securely" }
    ],

    testimonials: [
      { quote: "The add-ons made a huge difference — our website feels faster and way more complete now. Great work as always!", name: "Sara M.", role: "Founder, Luma Store" }
    ]
  }
};

/* Currency formatter helper: 10000 -> "10,000" */
function formatEGP(n) {
  return Number(n).toLocaleString("en-US");
}
