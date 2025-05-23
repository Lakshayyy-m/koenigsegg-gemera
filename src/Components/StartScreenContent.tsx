import { useGSAP } from "@gsap/react";
import { forwardRef, useRef } from "react";
import { gsap } from "gsap";

const StartScreenContent = forwardRef(
  (_props, ref: React.Ref<HTMLDivElement>) => {
    const koenigseggRef = useRef<HTMLHeadingElement>(null);
    const gemeraRef = useRef<HTMLHeadingElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    useGSAP(() => {
      if (!koenigseggRef.current || !gemeraRef.current || !logoRef.current) {
        return;
      }

      //Logo animation
      gsap.from(logoRef.current, {
        opacity: 0,
        duration: 1,
        //   scale: 0.5,
        delay: 2.5,
        ease: "power4.in",
      });
      //Koenigsegg text animation
      gsap.from(koenigseggRef.current.children, {
        opacity: 0,
        duration: 0.4,
        scale: 1.3,
        delay: 2,
        ease: "power4.in",
        stagger: 0.05,
      });
      //Gemera text animation
      gsap.from(gemeraRef.current.children, {
        opacity: 0,
        duration: 0.6,
        scale: 1.1,
        delay: 2,
        ease: "power4.in",
        stagger: -0.05,
      });
    }, []);
    const convertToSpan = (str: string, underline: boolean = false) => {
      return str.split("").map((char, i) => (
        <span className={`inline-block ${underline && "underline"}`} key={i}>
          {char}
        </span>
      ));
    };

    return (
      <div ref={ref} className="relative -z-10">
        <div className="relative -z-10">
          <div
            className=" text-stone-800 text-9xl font-['Koenigsegg'] font-bold italic fixed left-[10%] top-[3%]"
            ref={koenigseggRef}
          >
            {convertToSpan("Koenigsegg", true)}
            <br />
            <span className="text-4xl ">The Family</span>
            <br />
            <span className="text-4xl relative left-20 bottom-20">
              Hypercar
            </span>
          </div>
          <h1
            className="text-stone-800 text-[9rem] font-['Gemera']  fixed bottom-[0%] right-[10%] text-right"
            ref={gemeraRef}
          >
            {convertToSpan("Gemera")}
          </h1>
        </div>
        <div className="top-0 -z-10 fixed left-0 flex justify-end  w-screen h-screen">
          <img
            src="/assets/koenigseggLogo.svg"
            className="scale-20 "
            ref={logoRef}
          />
        </div>
      </div>
    );
  }
);

export default StartScreenContent;
