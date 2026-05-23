import Typewriter from "typewriter-effect";

const words = [
  "Odoo Developer",
  "Python Backend Developer",
  "ERP Workflow Builder",
  "Automation Builder",
  "Creative Technologist",
];

export default function TypingTitle() {
  return (
    <div className="inline-flex min-h-8 items-center rounded-full border border-primary/20 bg-primary-soft px-4 py-2 font-mono text-sm text-primary">
      <Typewriter
        onInit={(typewriter) => {
          words.forEach((word) => {
            typewriter.typeString(word).pauseFor(1200).deleteAll();
          });
          typewriter.start();
        }}
        options={{
          autoStart: true,
          delay: 44,
          loop: true,
          wrapperClassName: "tracking-[0.04em]",
          cursorClassName: "ml-1 text-secondary",
        }}
      />
    </div>
  );
}
