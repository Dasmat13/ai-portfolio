import { GetStaticPaths, GetStaticProps } from 'next';
import { getPost } from '@/lib/markdown';

export default function BlogPost({ post }: any) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = require('fs');
  const files = fs.readdirSync("content");
  const paths = files.map((file: string) => ({
    params: { slug: file.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.slug as string);
  return {
    props: { post },
  };
};
