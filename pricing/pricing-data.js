/* ============================================================
   PRICING DATA — Kreem Aly / pricing.html
   All copy, numbers and structure are content data only; the
   rendering logic lives in pricing.js. Edit prices/copy here.

   Configurable plans (Websites tab): Premium & Signature carry a
   product/category quota built into their base price, plus an
   optional AI Agent add-on. The extra cost for going over the
   quota is computed live in pricing.js from the fields below —
   change the numbers here and the whole page (cards + cart +
   checkout) recalculates automatically.
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
    sectionDesc: "Professional websites tailored to your goals, from simple stores to fully custom platforms.",
    compareWord: "Packages",
    compareDesc: "See what's included in each package.",
    compareLinkText: "View Full Comparison →",
    howItWorksDesc: "From idea to launch, a smooth and transparent process.",
    testimonialSub: "Real feedback. Real results.",

    /* Notes shown once above the cards — shared basics every website
       package includes, so they don't need repeating card by card. */
    commonNotes: [
      "Domain &amp; hosting setup included, ready to go live",
      "Comes with its own management dashboard — orders, products &amp; content",
      "Fully responsive on desktop, tablet, and mobile",
      "Every order's full details sent straight to your WhatsApp &amp; email — and to your customer too"
    ],

    plans: [
      {
        id: "web-premium",
        name: "Premium",
        tag: "MOST POPULAR",
        blurb: "For growing online stores",
        cover: "photo",
        highlight: true,
        configurable: true,
        basePrice: 12000,
        baseProducts: 150,
        baseCategories: 10,
        maxCategories: 10,
        productStep: 50,
        productStepPrice: 1000,
        aiAgent: {
          price: 4000,
          label: "AI Agent (answers customers, recommends products, works 24/7)",
          desc: "A friendly AI agent trained on your whole website — reads every page, answers customer questions, and recommends the right products round the clock."
        },
        features: [
          "Up to 150 Products &amp; 10 Categories Included",
          "+1,000 EGP per extra 50 products (categories stay free)",
          "Unlimited Pages",
          "Full Management Dashboard",
          "Custom UI/UX Design",
          "CMS (Easy to Manage)",
          "Advanced SEO Setup",
          "2 Weeks Free Follow-Up — Then 500 EGP / Edit"
        ],
        cta: "Add to Cart"
      },
      {
        id: "web-signature",
        name: "Signature",
        tag: "BEST VALUE",
        blurb: "For established, high-volume brands",
        cover: "photo",
        highlight: false,
        configurable: true,
        basePrice: 15000,
        baseProducts: 400,
        baseCategories: 20,
        maxCategories: 20,
        productStep: 50,
        productStepPrice: 1000,
        aiAgent: {
          price: 6000,
          label: "AI Agent + Full Dashboard Control (image uploads, live order updates)",
          desc: "Everything the Premium AI agent does, plus image uploads from customers, full control over your dashboard, live order tracking, and automatic status updates sent to every customer."
        },
        features: [
          "Up to 400 Products &amp; 20 Categories Included",
          "+1,000 EGP per extra 50 products (categories stay free)",
          "Unlimited Pages",
          "Full Management Dashboard",
          "Custom UI/UX Design",
          "Advanced Integrations",
          "Performance Optimization",
          "Priority Support",
          "1 Month Free Follow-Up — Then 500 EGP / Edit"
        ],
        cta: "Add to Cart"
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
      headers: ["Feature", "Premium", "Signature"],
      rows: [
        ["Products Included", "150", "400"],
        ["Categories Included", "10", "20"],
        ["Extra Products", "+1,000 EGP / 50", "+1,000 EGP / 50"],
        ["Management Dashboard", true, true],
        ["Custom UI/UX Design", true, true],
        ["SEO Setup", "Advanced", "Advanced"],
        ["Performance Optimization", false, true],
        ["Priority Support", false, true],
        ["Free Follow-Up", "2 Weeks", "1 Month"],
        ["AI Agent (optional)", "+4,000 EGP", "+6,000 EGP"]
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
    subtitle: "A standalone admin dashboard to manage, analyze, and grow your existing store or business — all in one place.",
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

    commonNotes: [
      "Domain &amp; hosting setup included, ready to go live",
      "Fully responsive on desktop, tablet, and mobile",
      "Every order's full details sent straight to your WhatsApp &amp; email — and to your customer too"
    ],

    plans: [
      {
        id: "dash-premium",
        name: "Premium",
        tag: "MOST POPULAR",
        blurb: "Full control for a growing store",
        price: 5000,
        currency: "EGP",
        cover: "photo",
        highlight: true,
        features: [
          "Orders, Products &amp; Customers Management",
          "Inventory Tracking",
          "Sales &amp; Revenue Analytics",
          "Role-Based Staff Access",
          "Custom Design (Your Brand)",
          "2 Weeks Free Follow-Up — Then 500 EGP / Edit"
        ],
        cta: "Add to Cart"
      },
      {
        id: "dash-signature",
        name: "Signature",
        tag: "BEST VALUE",
        blurb: "Advanced analytics &amp; automation",
        price: 8000,
        currency: "EGP",
        cover: "photo",
        highlight: false,
        features: [
          "Everything in Premium",
          "Real-Time Analytics &amp; Reports",
          "Advanced Security &amp; Backups",
          "Data Export (Excel, PDF)",
          "Custom Features &amp; API Integrations",
          "Priority Support",
          "1 Month Free Follow-Up — Then 500 EGP / Edit"
        ],
        cta: "Add to Cart"
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
      headers: ["Feature", "Premium", "Signature"],
      rows: [
        ["Order Management", true, true],
        ["Product &amp; Inventory Management", true, true],
        ["Analytics &amp; Reports", "Standard", "Real-Time"],
        ["Staff Roles", true, true],
        ["Data Export", false, "PDF, Excel"],
        ["Custom Features / API", false, true],
        ["Support", "Standard", "Priority"],
        ["Free Follow-Up", "2 Weeks", "1 Month"]
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
        id: "ai-premium",
        name: "Premium",
        tag: "MOST POPULAR",
        blurb: "A friendly agent that never sleeps",
        price: 4000,
        currency: "EGP",
        cover: "robot",
        highlight: true,
        features: [
          "Reads &amp; Understands Your Whole Website",
          "Answers Customer Questions Instantly",
          "Recommends The Right Products",
          "Friendly, On-Brand Personality",
          "Works 24/7",
          "Arabic &amp; English Support"
        ],
        cta: "Add to Cart"
      },
      {
        id: "ai-signature",
        name: "Signature",
        tag: "BEST VALUE",
        blurb: "Everything in Premium, plus full dashboard control",
        price: 6000,
        currency: "EGP",
        cover: "robot",
        highlight: false,
        features: [
          "Everything in Premium",
          "Customers Can Send Photos To The Agent",
          "Full Control Over Your Dashboard",
          "Tracks &amp; Updates Order Status Live",
          "Sends Customers Their Order Status Automatically",
          "Priority Support"
        ],
        cta: "Add to Cart"
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
          "Ongoing Development"
        ],
        cta: "Request a Quote",
        highlight: false,
        isCustomCta: true
      }
    ],

    compare: {
      headers: ["Feature", "Premium", "Signature"],
      rows: [
        ["Reads Your Website", true, true],
        ["Product Recommendations", true, true],
        ["Works 24/7", true, true],
        ["Arabic &amp; English", true, true],
        ["Image Uploads From Customers", false, true],
        ["Dashboard Control", false, true],
        ["Live Order Tracking &amp; Updates", false, true],
        ["Support", "Standard", "Priority"]
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
  }
};

/* Currency formatter helper: 10000 -> "10,000" */
function formatEGP(n) {
  return Number(n).toLocaleString("en-US");
}
