import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// const items = [
//   {
//     title: "Is it animated?",
//     content:
//       "Yes. It's animated by default, but you can disable it if you prefer.",
//   },
// ];

export default function MyReadMore({longDescription}) {
  return (
    <Accordion type="single" collapsible className="max-w-full w-full">
        <AccordionItem value={`longDescription`}>
          <AccordionTrigger className="text-red-700 py-2">View Detail</AccordionTrigger>
          <AccordionContent><div dangerouslySetInnerHTML={{__html:longDescription}}></div></AccordionContent>
        </AccordionItem>
    </Accordion>
  );
}
