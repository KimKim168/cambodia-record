
import { Card, CardContent, CardHeader } from "../components/ui/card";
const features = [
  {
   
    title: "Identify Opportunities",
    description:
      "Easily uncover untapped areas to explore and expand your reach effortlessly.",
  },
  {
 
    title: "Build Authority",
    description:
      "Create valuable content that resonates, inspires trust, and positions you as an expert.",
  },
  {

    title: "Instant Insights",
    description:
      "Gain immediate, actionable insights with a quick glance, enabling fast decision-making.",
  },
  {

    title: "Engage with Your Audience",
    description:
      "Boost audience engagement with interactive features like polls, quizzes, and forms.",
  },
  {

    title: "Automate Your Workflow",
    description:
      "Streamline your processes by automating repetitive tasks, saving time and reducing effort.",
  },
  {

    title: "Accelerate Growth",
    description:
      "Supercharge your growth by implementing strategies that drive results quickly and efficiently.",
  },
];

const MyOurServices = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-2xl w-full py-10 px-4 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-xl text-center">
                <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h2>
            </div>
            <div className="relative mt-6 h-[2px] w-full bg-gray-300">
                <div className="absolute top-0 left-1/2 h-[2px] w-20 -translate-x-1/2 transform bg-yellow-400"></div>
            </div>
        <div className="mt-8 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col border pb-0 rounded-xl overflow-hidden shadow-none"
            >
              <CardHeader>
                <h4 className="!mt-3 text-xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="mt-1 text-muted-foreground text-[17px]">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto px-0 pb-0">
                <img src="/assets/demo-images/rule-images/image4.jpg" className="w-full aspect-video object-cover bg-muted h-50 ml-6 rounded-tl-xl" />
              
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOurServices;

