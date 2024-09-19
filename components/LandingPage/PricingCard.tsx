/* Next */
import Link from 'next/link';

/* Components */
import { Check, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from '../ui/card';

/* utils */
import { cn } from '@/lib/utils';

type PricingCardProps = {
  title: string;
  price: string;
  featuresYes: string[];
  featuresNo?: string[];
  recommended: boolean;
}

const PricingCard = ({ title, price, featuresYes, featuresNo = [], recommended }: PricingCardProps) => {
  return (
    <Card className={cn("w-[400px] max-h-lg flex flex-col justify-between rounded-xl", recommended && "border-2 border-black shadow-lg shadow-neutral-500")}>
      <CardHeader className='p-5'>
        <CardTitle className="text-xl font-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-4xl font-bold mb-6">${price}<span className="text-lg font-normal text-muted-foreground"> /month</span></p>
          <div className="space-y-2">
            {featuresYes.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="size-5 mr-2 text-primary" />
                <p>{feature}</p>
              </div>
            ))}
            {featuresNo.map((feature, index) => (
              <div key={index} className="flex items-center">
                <XIcon className="w-5 h-5 mr-2 text-red-500" />
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
        <Link href="https://launch.drip.ma/waitlist/foundr-waitlist" className="w-full mt-6">
          <Button variant="default" className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-primary h-9 px-4 py-2 group relative gap-2 overflow-hidden tracking-tighter transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2">Join Waitlist</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PricingCard