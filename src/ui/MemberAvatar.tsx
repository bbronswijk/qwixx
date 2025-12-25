import Image, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  nickName: string;
}

export function MemberAvatar({ nickName, className, ...props }: Props) {
  const set = "initials";

  const url = new URL(`https://api.dicebear.com/9.x/${set}/png`);

  url.searchParams.append("seed", nickName);
  url.searchParams.append("radius", "50");
  url.searchParams.append("scale", "80");

  return <Image {...props} className={className} src={url.toString()} alt={nickName} />;
}
