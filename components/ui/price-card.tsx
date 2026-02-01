import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import DummyImage from "@/assets/practice-papers/image.png";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  price: string;
  itemLink: string;
  imageLink: StaticImageData | undefined;
}

const ProductCard = ({ itemLink, price, imageLink }: ProductCardProps) => {
  const handleBuyNow = () => {
    if (itemLink) {
      window.open(itemLink, "_blank");
    }
  };
  return (
    <div className="border bg-white rounded-lg shadow-sm p-4 w-80 lg:block lg:sticky top-[10px]">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={imageLink || DummyImage}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex items-center gap-4 my-2 mb-4">
        <h3 className="text-3xl font-semibold">£{price}</h3>
        <span className="border-x-2 border-gray-500 h-10 inline-block"></span>
        <div className="flex flex-col">
          <span className="text-[#C0F333]">★★★★★</span>
          <span className="text-gray-500 text-sm">
            (4.5 stars) • 15 reviews
          </span>
        </div>
      </div>

      <Button
        onClick={handleBuyNow}
        className="w-full bg-primary text-white mt-2 border border-primary"
        variant="outline"
      >
        Buy now
      </Button>
    </div>
  );
};

export default ProductCard;
