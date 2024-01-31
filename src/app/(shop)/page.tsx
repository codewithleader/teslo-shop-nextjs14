import { titleFont } from '@/config/fonts';

export default function HomePage() {
  return (
    <div className="">
      <h1>Hello world</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hello world</h1>
      <h1 className={`${titleFont.className}`}>Hello world</h1>
    </div>
  );
}
