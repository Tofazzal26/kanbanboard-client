import { Milestone, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <div className="text-center pt-6">
              <h3 className="text-base lg:text-xl text-[#57c1ee] uppercase">
                Let's connect together
              </h3>
              <h2 className="text-2xl lg:text-[45px] font-black text-[#29361a]">
                Contact
              </h2>
            </div>
            <div className="my-6">
              <div className="flex lg:flex-row flex-col justify-center items-center gap-8">
                <div className="rounded-md customShadow w-full lg:w-[350px] h-[100px] lg:h-[200px] mt-6">
                  <div className="flex justify-center flex-col items-center">
                    <h2 className="text-[20px] lg:text-[30px] font-extrabold">
                      Contact Us
                    </h2>
                    <h2 className="lg:text-[24px] text-lg text-[#57c1ee] font-bold my-3 flex items-center gap-2">
                      <Phone /> +8801306-700357
                    </h2>
                    <p className="text-[#767676]">Tel: +8801931-342951</p>
                    <p className="text-[#767676] mt-2">
                      Email: info@example.com
                    </p>
                  </div>
                </div>
                <div className="rounded-md customShadow w-full lg:w-[350px] h-[100px] lg:h-[200px] mt-6">
                  <div className="flex justify-center flex-col items-center ">
                    <Milestone size={40} color="#57c1ee" />
                    <h2 className="text-[20px] lg:text-[30px] font-extrabold">
                      Get Direction
                    </h2>
                    <p className="text-[#767676]">Boubazar Tongi, Gazipur</p>
                    <p className="text-[#767676] mt-2">Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="rounded-md customShadow w-full lg:w-[350px] h-[100px] lg:h-[200px] mt-6">
                  <div className="text-center px-6">
                    <h2 className="text-[20px] lg:text-[30px] font-extrabold">
                      Opening Hours
                    </h2>
                    <div className="flex justify-between items-center mt-10">
                      <p className="text-[#767676]">Monday - Friday</p>
                      <p className="text-[#767676]">9.00 - 20.00</p>
                    </div>
                    <div className="flex justify-between items-center border-t-2 border-dotted border-gray-400 mt-4 pt-4">
                      <p className="text-[#767676]">Saturday - Sunday</p>
                      <p className="text-[#767676]">8.00 - 22.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-6 lg:pt-0 pt-16">
              <div className="lg:flex lg:justify-center lg:items-center">
                <div>
                  <h2 className="text-xl lg:text-2xl">Ask a question</h2>
                  <div className="mt-3 lg:mt-6">
                    <input
                      type="text"
                      placeholder="Name"
                      className="outline-none px-6 py-3 border-[1px] border-[#d5d5d5] rounded-lg w-full lg:w-[800px]"
                    />
                  </div>
                  <div className="mt-3 lg:mt-6">
                    <input
                      type="text"
                      placeholder="Email"
                      className="outline-none px-6 py-3 border-[1px] border-[#d5d5d5] rounded-lg w-full lg:w-[800px]"
                    />
                  </div>
                  <div className="mt-3 lg:mt-6">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="outline-none px-6 py-3 border-[1px] border-[#d5d5d5] rounded-lg w-full lg:w-[800px]"
                    />
                  </div>
                  <div className="mt-3 lg:mt-6">
                    <textarea
                      cols={5}
                      rows={5}
                      className="outline-none px-6 py-3 border-[1px] border-[#d5d5d5] rounded-lg w-full lg:w-[800px]"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <div className="mt-3 lg:mt-6">
                    <button className="bg-[#57c1ee] lg:px-6 px-4 text-white py-[10px] lg:py-3 rounded-full">
                      SEND MESSAGE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
