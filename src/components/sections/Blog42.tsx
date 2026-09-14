import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight } from "relume-icons";
import { cardMedia, cardBody } from "@/lib/surface";
import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt?: string;
};

type BlogPost = {
  url: string;
  image: ImageProps;
  category: string;
  readTime: string;
  title: string;
  description: string;
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  blogPosts: BlogPost[];
  button: ButtonProps;
};

export type Blog42Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Blog42 = (props: Blog42Props) => {
  const { heading, description, button, blogPosts } = {
    ...Blog42Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-start gap-y-8 md:mb-18 md:grid-cols-[1fr_max-content] md:items-end md:justify-between md:gap-x-12 md:gap-y-4 lg:mb-20 lg:gap-x-20">
          <div className="md:mr-12 lg:mr-0">
            <div className="w-full max-w-lg">
              <h2 className="mb-3 text-h2 font-medium md:mb-4">{heading}</h2>
              <p className="text-medium">{description}</p>
            </div>
          </div>
          <div className="hidden md:flex">
            <Button {...button}>{button.title}</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div key={index} className={cn("flex size-full flex-col", cardMedia)}>
              <a href={post.url} className="w-full">
                <img
                  src={post.image.src}
                  alt={post.image.alt}
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className={cn("flex w-full flex-1 flex-col items-start", cardBody)}>
                <div className="mb-3 flex w-full items-center justify-start md:mb-4">
                  <Badge className="mr-4">{post.category}</Badge>
                  <p className="inline text-small font-semibold">{post.readTime}</p>
                </div>
                <a className="mb-2 block" href={post.url}>
                  <h2 className="text-h5 font-medium">{post.title}</h2>
                </a>
                <p>{post.description}</p>
                <Button
                  {...post.button}
                  className="mt-5 flex items-center justify-center gap-x-2 md:mt-6"
                >
                  {post.button.title}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button {...button} className="mt-10 md:hidden">
          {button.title}
        </Button>
      </div>
    </section>
  );
};

const blogPost: BlogPost = {
  url: "#",
  image: {
    src: "/placeholder-image-landscape.svg",
    alt: "Relume placeholder image",
  },
  category: "Category",
  readTime: "5 min read",
  title: "Blog title heading will go here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  button: {
    title: "Read more",
    variant: "link",
    size: "link",
    iconRight: <ChevronRight className="text-scheme-text" />,
  },
};

export const Blog42Defaults: Props = {
  tagline: "Blog",
  heading: "Short heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "View all", variant: "secondary" },
  blogPosts: [blogPost, blogPost, blogPost],
};
