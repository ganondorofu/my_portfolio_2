import { achievementsData } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Achievements() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Achievements &amp; History</h2>
      <Accordion type="multiple" className="w-full" defaultValue={['競技・コンテスト']}>
        {achievementsData.map((category) => (
          <AccordionItem value={category.category} key={category.category}>
            <AccordionTrigger className="text-lg font-semibold">{category.category}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4 pt-2">
                {category.items.map((item) => (
                  <li key={item.title} className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className='flex-1'>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 md:mt-0 md:ml-4 shrink-0">{item.date}</p>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
