import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/ui-button";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  selected?: boolean;
};

export default function VoteItem({
  id,
  image,
  title,
  description,
  selected,
}: Props) {
  console.log(id, image);
  return (
    <Button
      as={"div"}
      borderRadius="1.75rem"
      className="border-slate-800 p-1"
      duration={4000}
    >
      <Card className="relative h-full w-full cursor-pointer border-none bg-transparent">
        <CardHeader>{title}</CardHeader>
        <CardContent>{description}</CardContent>
      </Card>
      {selected && (
        <div className="absolute inset-0 rounded-[1.5rem] bg-cyan-500/30"></div>
      )}
    </Button>
  );
}
