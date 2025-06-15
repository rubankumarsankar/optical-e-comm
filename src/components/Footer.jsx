import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        {/* Brand Info */}
        <div>
          {/* <h3 className="font-bold text-lg mb-2">VisionOptic</h3>
          <p className="text-sm mb-3">
            Your trusted destination for quality eyewear and contact lenses since 2010.
          </p> */}
          <div className="flex gap-4 mt-2 text-xl">
            <FaFacebookF className="hover:text-secondary cursor-pointer" />
            <FaInstagram className="hover:text-secondary cursor-pointer" />
            <FaTwitter className="hover:text-secondary cursor-pointer" />
            <FaPinterest className="hover:text-secondary cursor-pointer" />
          </div>
        </div>

        {/* Customer Service */}
        {/* <div>
          <h4 className="font-bold mb-2">Customer Service</h4>
          <ul className="space-y-1 text-sm">
            <li>Contact Us</li>
            <li>Shipping & Delivery</li>
            <li>Returns & Exchanges</li>
            <li>Prescription Info</li>
            <li>Frame Size Guide</li>
          </ul>
        </div> */}

        {/* Quick Links */}
        {/* <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Our Blog</li>
            <li>Store Locator</li>
            <li>Careers</li>
            <li>FAQs</li>
          </ul>
        </div> */}

        {/* Newsletter */}
        {/* <div>
          <h4 className="font-bold mb-2">Stay Updated</h4>
          <p className="text-sm mb-3">
            Subscribe to our newsletter for exclusive offers and eyecare tips.
          </p>
          <form className="flex mt-2">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded-l w-full text-black"
            />
            <button className="bg-white text-primary px-4 py-2 rounded-r font-semibold hover:bg-secondary transition">
              Subscribe
            </button>
          </form>
        </div> */}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary text-sm text-center py-4 px-4">
        <p>© 2025 VisionOptic. All rights reserved.</p>
      </div>
    </footer>
  );
}
