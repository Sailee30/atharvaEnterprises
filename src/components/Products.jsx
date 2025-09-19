import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../components/Products.json";

// Import all 270 images with correct extensions
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.webp";
import img7 from "../assets/7.webp";
import img8 from "../assets/8.webp";
import img9 from "../assets/9.jpg";
import img10 from "../assets/10.jpg";
import img11 from "../assets/11.jpg";
import img12 from "../assets/12.jpg";
import img13 from "../assets/13.webp";
import img14 from "../assets/14.webp";
import img15 from "../assets/15.webp";
import img16 from "../assets/16.png";
import img17 from "../assets/17.webp";
import img18 from "../assets/18.webp";
import img19 from "../assets/19.webp";
import img20 from "../assets/20.webp";
import img21 from "../assets/21.jpg";
import img22 from "../assets/22.webp";
import img23 from "../assets/23.webp";
import img24 from "../assets/24.jpg";
import img25 from "../assets/25.webp";
import img26 from "../assets/26.avif";
import img27 from "../assets/27.png";
import img28 from "../assets/28.webp";
import img29 from "../assets/29.jpg";
import img30 from "../assets/30.jpg";
import img31 from "../assets/31.webp";
import img32 from "../assets/32.png";
import img33 from "../assets/33.jpg";
import img34 from "../assets/34.jpg";
import img35 from "../assets/35.png";
import img36 from "../assets/36.jpg";
import img37 from "../assets/37.jpg";
import img38 from "../assets/38.jpeg";
import img39 from "../assets/39.jpg";
import img40 from "../assets/40.jpg";
import img41 from "../assets/41.webp";
import img42 from "../assets/42.webp";
import img43 from "../assets/43.webp";
import img44 from "../assets/44.jpeg";
import img45 from "../assets/45.webp";
import img46 from "../assets/46.webp";
import img47 from "../assets/47.jpeg";
import img48 from "../assets/48.png";
import img49 from "../assets/49.webp";
import img50 from "../assets/50.webp";
import img51 from "../assets/51.jpg";
import img52 from "../assets/52.avif";
import img53 from "../assets/53.jpg";
import img54 from "../assets/54.jpg";
import img55 from "../assets/55.jpg";
import img56 from "../assets/56.webp";
import img57 from "../assets/57.jpg";
import img58 from "../assets/58.jpeg";
import img59 from "../assets/59.webp";
import img60 from "../assets/60.png";
import img61 from "../assets/61.webp";
import img62 from "../assets/62.webp";
import img63 from "../assets/63.jpg";
import img64 from "../assets/64.jpg";
import img65 from "../assets/65.jpeg";
import img66 from "../assets/66.jpeg";
import img67 from "../assets/67.jpeg";
import img68 from "../assets/68.jpg";
import img69 from "../assets/69.jpeg";
import img70 from "../assets/70.jpg";
import img71 from "../assets/71.jpg";
import img72 from "../assets/72.jpg";
import img73 from "../assets/73.jpg";
import img74 from "../assets/74.jpg";
import img75 from "../assets/75.jpg";
import img76 from "../assets/76.jpg";
import img77 from "../assets/77.webp";
import img78 from "../assets/78.jpg";
import img79 from "../assets/79.jpg";
import img80 from "../assets/80.webp";
import img81 from "../assets/81.jpg";
import img82 from "../assets/82.webp";
import img83 from "../assets/83.webp";
import img84 from "../assets/84.webp";
import img85 from "../assets/85.webp";
import img86 from "../assets/86.webp";
import img87 from "../assets/87.webp";
import img88 from "../assets/88.webp";
import img89 from "../assets/89.webp";
import img90 from "../assets/90.jpg";
import img91 from "../assets/91.jpg";
import img92 from "../assets/92.webp";
import img93 from "../assets/93.webp";
import img94 from "../assets/94.webp";
import img95 from "../assets/95.webp";
import img96 from "../assets/96.webp";
import img97 from "../assets/97.jpg";
import img98 from "../assets/98.jpg";
import img99 from "../assets/99.jpg";
import img100 from "../assets/100.jpg";
import img101 from "../assets/101.jpg";
import img102 from "../assets/102.webp";
import img103 from "../assets/103.webp";
import img104 from "../assets/104.webp";
import img105 from "../assets/105.webp";
import img106 from "../assets/106.webp";
import img107 from "../assets/107.webp";
import img108 from "../assets/108.webp";
import img109 from "../assets/109.webp";
import img110 from "../assets/110.webp";
import img111 from "../assets/111.webp";
import img112 from "../assets/112.webp";
import img113 from "../assets/113.webp";
import img114 from "../assets/114.webp";
import img115 from "../assets/115.webp";
import img116 from "../assets/116.webp";
import img117 from "../assets/117.webp";
import img118 from "../assets/118.webp";
import img119 from "../assets/119.webp";
import img120 from "../assets/120.webp";
import img121 from "../assets/121.webp";
import img122 from "../assets/122.webp";
import img123 from "../assets/123.webp";
import img124 from "../assets/124.webp";
import img125 from "../assets/125.jpg";
import img126 from "../assets/126.jpg";
import img127 from "../assets/127.jpg";
import img128 from "../assets/128.webp";
import img129 from "../assets/129.webp";
import img130 from "../assets/130.webp";
import img131 from "../assets/131.jpeg";
import img132 from "../assets/132.jpeg";
import img133 from "../assets/133.webp";
import img134 from "../assets/134.webp";
import img135 from "../assets/135.webp";
import img136 from "../assets/136.webp";
import img137 from "../assets/137.webp";
import img138 from "../assets/138.webp";
import img139 from "../assets/139.webp";
import img140 from "../assets/140.webp";
import img141 from "../assets/141.webp";
import img142 from "../assets/142.webp";
import img143 from "../assets/143.webp";
import img144 from "../assets/144.webp";
import img145 from "../assets/145.webp";
import img146 from "../assets/146.webp";
import img147 from "../assets/147.webp";
import img148 from "../assets/148.webp";
import img149 from "../assets/149.webp";
import img150 from "../assets/150.webp";
import img151 from "../assets/151.webp";
import img152 from "../assets/152.webp";
import img153 from "../assets/153.jpg";
import img154 from "../assets/154.jpg";
import img155 from "../assets/155.jpeg";
import img156 from "../assets/156.jpeg";
import img157 from "../assets/157.avif";
import img158 from "../assets/158.webp";
import img159 from "../assets/159.webp";
import img160 from "../assets/160.webp";
import img161 from "../assets/161.webp";
import img162 from "../assets/162.webp";
import img163 from "../assets/163.webp";
import img164 from "../assets/164.jpeg";
import img165 from "../assets/165.jpeg";
import img166 from "../assets/166.jpg";
import img167 from "../assets/167.jpeg";
import img168 from "../assets/168.jpeg";
import img169 from "../assets/169.webp";
import img170 from "../assets/170.jpeg";
import img171 from "../assets/171.webp";
import img172 from "../assets/172.webp";
import img173 from "../assets/173.webp";
import img174 from "../assets/174.webp";
import img175 from "../assets/175.jpeg";
import img176 from "../assets/176.jpeg";
import img177 from "../assets/177.webp";
import img178 from "../assets/178.webp";
import img179 from "../assets/179.webp";
import img180 from "../assets/180.webp";
import img181 from "../assets/181.webp";
import img182 from "../assets/182.webp";
import img183 from "../assets/183.webp";
import img184 from "../assets/184.jpeg";
import img185 from "../assets/185.webp";
import img186 from "../assets/186.webp";
import img187 from "../assets/187.webp";
import img188 from "../assets/188.webp";
import img189 from "../assets/189.webp";
import img190 from "../assets/190.webp";
import img191 from "../assets/191.webp";
import img192 from "../assets/192.webp";
import img193 from "../assets/193.webp";
import img194 from "../assets/194.webp";
import img195 from "../assets/195.webp";
import img196 from "../assets/196.webp";
import img197 from "../assets/197.webp";
import img198 from "../assets/198.webp";
import img199 from "../assets/199.webp";
import img200 from "../assets/200.webp";
import img201 from "../assets/201.webp";
import img202 from "../assets/202.webp";
import img203 from "../assets/203.webp";
import img204 from "../assets/204.jpg";
import img205 from "../assets/205.jpeg";
import img206 from "../assets/206.webp";
import img207 from "../assets/207.webp";
import img208 from "../assets/208.png";
import img209 from "../assets/209.jpeg";
import img210 from "../assets/210.webp";
import img211 from "../assets/211.jpg";
import img212 from "../assets/212.webp";
import img213 from "../assets/213.webp";
import img214 from "../assets/214.webp";
import img215 from "../assets/215.webp";
import img216 from "../assets/216.webp";
import img217 from "../assets/217.webp";
import img218 from "../assets/218.webp";
import img219 from "../assets/219.webp";
import img220 from "../assets/220.webp";
import img221 from "../assets/221.webp";
import img222 from "../assets/222.webp";
import img223 from "../assets/223.webp";
import img224 from "../assets/224.webp";
import img225 from "../assets/225.webp";
import img226 from "../assets/226.webp";
import img227 from "../assets/227.webp";
import img228 from "../assets/228.webp";
import img229 from "../assets/229.webp";
import img230 from "../assets/230.webp";
import img231 from "../assets/231.webp";
import img232 from "../assets/232.webp";
import img233 from "../assets/233.webp";
import img234 from "../assets/234.webp";
import img235 from "../assets/235.webp";
import img236 from "../assets/236.webp";
import img237 from "../assets/237.webp";
import img238 from "../assets/238.webp";
import img239 from "../assets/239.webp";
import img240 from "../assets/240.webp";
import img241 from "../assets/241.webp";
import img242 from "../assets/242.webp";
import img243 from "../assets/243.webp";
import img244 from "../assets/244.webp";
import img245 from "../assets/245.webp";
import img246 from "../assets/246.webp";
import img247 from "../assets/247.webp";
import img248 from "../assets/248.webp";
import img249 from "../assets/249.webp";
import img250 from "../assets/250.webp";
import img251 from "../assets/251.webp";
import img252 from "../assets/252.webp";
import img253 from "../assets/253.jpeg";
import img254 from "../assets/254.jpg";
import img255 from "../assets/255.png";
import img256 from "../assets/256.jpeg";
import img257 from "../assets/257.webp";
import img258 from "../assets/258.jpeg";
import img259 from "../assets/259.jpg";
import img260 from "../assets/260.jpeg";
import img261 from "../assets/261.jpeg";
import img262 from "../assets/262.jpg";
import img263 from "../assets/263.jpg";
import img264 from "../assets/264.jpg";
import img265 from "../assets/265.jpg";
import img266 from "../assets/266.jpeg";
import img267 from "../assets/267.jpeg";
import img268 from "../assets/268.jpeg";
import img269 from "../assets/269.jpg";
import img270 from "../assets/270.jpeg";

// Create image mapping object with correct imports
const imageMap = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
  9: img9,
  10: img10,
  11: img11,
  12: img12,
  13: img13,
  14: img14,
  15: img15,
  16: img16,
  17: img17,
  18: img18,
  19: img19,
  20: img20,
  21: img21,
  22: img22,
  23: img23,
  24: img24,
  25: img25,
  26: img26,
  27: img27,
  28: img28,
  29: img29,
  30: img30,
  31: img31,
  32: img32,
  33: img33,
  34: img34,
  35: img35,
  36: img36,
  37: img37,
  38: img38,
  39: img39,
  40: img40,
  41: img41,
  42: img42,
  43: img43,
  44: img44,
  45: img45,
  46: img46,
  47: img47,
  48: img48,
  49: img49,
  50: img50,
  51: img51,
  52: img52,
  53: img53,
  54: img54,
  55: img55,
  56: img56,
  57: img57,
  58: img58,
  59: img59,
  60: img60,
  61: img61,
  62: img62,
  63: img63,
  64: img64,
  65: img65,
  66: img66,
  67: img67,
  68: img68,
  69: img69,
  70: img70,
  71: img71,
  72: img72,
  73: img73,
  74: img74,
  75: img75,
  76: img76,
  77: img77,
  78: img78,
  79: img79,
  80: img80,
  81: img81,
  82: img82,
  83: img83,
  84: img84,
  85: img85,
  86: img86,
  87: img87,
  88: img88,
  89: img89,
  90: img90,
  91: img91,
  92: img92,
  93: img93,
  94: img94,
  95: img95,
  96: img96,
  97: img97,
  98: img98,
  99: img99,
  100: img100,
  101: img101,
  102: img102,
  103: img103,
  104: img104,
  105: img105,
  106: img106,
  107: img107,
  108: img108,
  109: img109,
  110: img110,
  111: img111,
  112: img112,
  113: img113,
  114: img114,
  115: img115,
  116: img116,
  117: img117,
  118: img118,
  119: img119,
  120: img120,
  121: img121,
  122: img122,
  123: img123,
  124: img124,
  125: img125,
  126: img126,
  127: img127,
  128: img128,
  129: img129,
  130: img130,
  131: img131,
  132: img132,
  133: img133,
  134: img134,
  135: img135,
  136: img136,
  137: img137,
  138: img138,
  139: img139,
  140: img140,
  141: img141,
  142: img142,
  143: img143,
  144: img144,
  145: img145,
  146: img146,
  147: img147,
  148: img148,
  149: img149,
  150: img150,
  151: img151,
  152: img152,
  153: img153,
  154: img154,
  155: img155,
  156: img156,
  157: img157,
  158: img158,
  159: img159,
  160: img160,
  161: img161,
  162: img162,
  163: img163,
  164: img164,
  165: img165,
  166: img166,
  167: img167,
  168: img168,
  169: img169,
  170: img170,
  171: img171,
  172: img172,
  173: img173,
  174: img174,
  175: img175,
  176: img176,
  177: img177,
  178: img178,
  179: img179,
  180: img180,
  181: img181,
  182: img182,
  183: img183,
  184: img184,
  185: img185,
  186: img186,
  187: img187,
  188: img188,
  189: img189,
  190: img190,
  191: img191,
  192: img192,
  193: img193,
  194: img194,
  195: img195,
  196: img196,
  197: img197,
  198: img198,
  199: img199,
  200: img200,
  201: img201,
  202: img202,
  203: img203,
  204: img204,
  205: img205,
  206: img206,
  207: img207,
  208: img208,
  209: img209,
  210: img210,
  211: img211,
  212: img212,
  213: img213,
  214: img214,
  215: img215,
  216: img216,
  217: img217,
  218: img218,
  219: img219,
  220: img220,
  221: img221,
  222: img222,
  223: img223,
  224: img224,
  225: img225,
  226: img226,
  227: img227,
  228: img228,
  229: img229,
  230: img230,
  231: img231,
  232: img232,
  233: img233,
  234: img234,
  235: img235,
  236: img236,
  237: img237,
  238: img238,
  239: img239,
  240: img240,
  241: img241,
  242: img242,
  243: img243,
  244: img244,
  245: img245,
  246: img246,
  247: img247,
  248: img248,
  249: img249,
  250: img250,
  251: img251,
  252: img252,
  253: img253,
  254: img254,
  255: img255,
  256: img256,
  257: img257,
  258: img258,
  259: img259,
  260: img260,
  261: img261,
  262: img262,
  263: img263,
  264: img264,
  265: img265,
  266: img266,
  267: img267,
  268: img268,
  269: img269,
  270: img270,
};

const getProductImage = (productId) => {
  return imageMap[productId] || img1; // Fallback to first image if ID not found
};

// Theme colors for professional brochure look
const themeColors = {
  primary: "#1E3A8A", // yellow-800 for professional tone
  secondary: "#93C5FD", // yellow-300 for accents
  accent: "#1D4ED8", // yellow-700 for highlights
  dark: "#111827", // Gray-900
};

// Brand-specific redirect URLs (fallback if brochureUrl is not available)
const brandRedirects = {
  Nilfisk: "https://www.nilfisk.com/",
  "Ingersoll Rand": "https://www.ingersollrand.com/en-in",
  "AROzone.com": "https://www.arozone.com/",
  "Tristar Bolting": "https://www.tristarbolting.com/",
  "SP Air Tools": "https://www.spairtools.com/",
};

// Get brand-specific category based on product name or brand
const getBrandCategory = (product) => {
  const brand = product.brand || product.mainCategory;
  switch (brand) {
    case "Nilfisk":
      return "Pressure Washers & Accessories";
    case "Ingersoll Rand":
      return "Power Tools, Lifting Solutions, Pumps";
    case "AROzone.com":
      return "Pumps";
    case "Tristar Bolting":
      return "Hydraulic Torque Tools & Sockets";
    case "SP Air Tools":
      return "Tool Products";
    default:
      return "General Products";
  }
};

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    message: "",
  });
  const productsPerPage = 9; // Increased for better layout without filters

  const sortedProducts = useMemo(() => {
    let sorted = [...productsData];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-high":
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "featured":
      default:
        return sorted;
    }
  }, [sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your enquiry has been sent to our team.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      message: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        background: `radial-gradient(circle at 90% 10%, ${themeColors.secondary}20, transparent 30%),
                  radial-gradient(circle at 10% 90%, ${themeColors.secondary}20, transparent 30%)`,
      }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <nav className="flex justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2 text-gray-600">
              <li>
                <Link to="/" className="hover:text-yellow-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <span className="text-yellow-700">Catalog</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Catalog
          </h1>
          <p className="text-gray-600">
            Explore our professional-grade products from leading brands.
          </p>
        </div>

        {/* Centered main content */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
              {sortedProducts.length} products
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-200 rounded order-1 sm:order-2"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentProducts.map((product) => {
              const brand = product.brand || product.mainCategory;
              const fallbackUrl =
                brandRedirects[brand] ||
                brandRedirects[getBrandCategory(product).split(" & ")[0]] ||
                "https://www.example.com";
              const brochureUrl = product.brochureUrl || fallbackUrl;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getProductImage(product.id)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <a
                        href={brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-yellow-600 hover:underline hover:text-yellow-800 transition-colors"
                      >
                        View Brochure
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Professional Pagination - Centered */}
          {sortedProducts.length > productsPerPage && (
            <div className="flex flex-col items-center mt-16 mb-8">
              {/* Pagination Info */}
              <div className="text-sm text-gray-600 mb-6">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {(currentPage - 1) * productsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(
                    currentPage * productsPerPage,
                    sortedProducts.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {sortedProducts.length}
                </span>{" "}
                products
              </div>

              {/* Main Pagination Container */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
                <div className="flex items-center gap-1 justify-center">
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed bg-gray-50"
              : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 active:scale-95"
          }
        `}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 mx-2">
                    {(() => {
                      let pages = [];
                      const maxVisiblePages = 7;

                      if (totalPages <= maxVisiblePages) {
                        // Show all pages if total is small
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // Smart pagination logic
                        if (currentPage <= 4) {
                          pages = [1, 2, 3, 4, 5, "...", totalPages];
                        } else if (currentPage >= totalPages - 3) {
                          pages = [
                            1,
                            "...",
                            totalPages - 4,
                            totalPages - 3,
                            totalPages - 2,
                            totalPages - 1,
                            totalPages,
                          ];
                        } else {
                          pages = [
                            1,
                            "...",
                            currentPage - 1,
                            currentPage,
                            currentPage + 1,
                            "...",
                            totalPages,
                          ];
                        }
                      }

                      return pages.map((page, index) => {
                        if (page === "...") {
                          return (
                            <span
                              key={`ellipsis-${index}`}
                              className="px-3 py-2 text-gray-400 text-sm"
                            >
                              ⋯
                            </span>
                          );
                        }

                        const isActive = currentPage === page;
                        return (
                          <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`
                  min-w-[40px] h-10 flex items-center justify-center rounded-xl text-sm font-semibold
                  transition-all duration-300 relative overflow-hidden group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-200"
                      : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 active:scale-95"
                  }
                `}
                          >
                            {isActive && (
                              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20 rounded-xl"></div>
                            )}
                            <span className="relative z-10">{page}</span>
                            {!isActive && (
                              <div className="absolute inset-0 bg-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            )}
                          </button>
                        );
                      });
                    })()}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed bg-gray-50"
              : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 active:scale-95"
          }
        `}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Quick Jump (Optional - shows for large datasets) */}
              {totalPages > 10 && (
                <div className="flex items-center gap-3 mt-4 text-sm text-gray-600">
                  <span>Go to page:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                          paginate(page);
                        }
                      }}
                      className="w-16 px-2 py-1 text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                    <span className="text-gray-400">of {totalPages}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Centered Enquiry Form */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Enquiry Form
              </h2>
              <p className="text-gray-600">
                Get in touch with our sales team and partners for more details.
              </p>
            </div>
            <div
              className="success-message text-center"
              id="successMessage"
              style={{ display: "none" }}
            >
              ✅ Thank you for your enquiry! We'll get back to you within 24
              hours.
            </div>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 required"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IN">India</option>
                  <option value="JP">Japan</option>
                  <option value="CN">China</option>
                  <option value="BR">Brazil</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 required"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Tell us about your requirements, questions, or how we can help you..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full max-w-xs py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;