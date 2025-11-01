function About() {
  return (
    <div className="bg-inkporabg min-h-screen px-6 sm:px-12 lg:px-32 py-16 text-gray-800">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-dancingscript text-black mb-4">
          About inkPora
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Where creativity meets craftsmanship — inkPora is more than just a
          stationery brand; it’s a movement to bring back the art of expression
          through pen and paper.
        </p>
      </div>

      {/* Story Section */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 mb-20">
        <img
          src="/assets/aboutUs1.png"
          alt="Our story"
          className="w-full lg:w-1/2 rounded-2xl shadow-md object-cover"
        />
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-playfair mb-4 text-black">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded with a deep passion for writing, inkPora began as a dream to
            create high-quality, elegant stationery that inspires ideas and
            ignites imagination. Every pen we craft, every notebook we design,
            and every stroke of ink reflects our dedication to the beauty of
            handwritten creativity.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10 mb-20">
        <img
          src="/assets/aboutUs2.png"
          alt="Our mission"
          className="w-full lg:w-1/2 rounded-2xl shadow-md object-cover"
        />
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-playfair mb-4 text-black">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is simple — to make writing feel beautiful again. We
            combine minimal design with premium quality to create products that
            make every note, sketch, and letter feel meaningful. At inkPora, we
            believe stationery isn’t just a tool — it’s a reflection of who you
            are.
          </p>
        </div>
      </div>

      {/* Closing Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-playfair mb-4 text-black">
          The inkPora Promise
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Every product we make goes through thoughtful design and quality
          checks, ensuring that you experience elegance, comfort, and
          performance — every time you write.
        </p>
        <p className="text-gray-800 italic font-dancingscript text-xl">
          “Because every idea deserves the perfect pen.”
        </p>
      </div>
    </div>
  );
}

export default About;
