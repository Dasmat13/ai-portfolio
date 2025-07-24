import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home({ posts }: any) {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">🧠 My Blog</h1>
      {posts.map((post: any) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className="border p-4 rounded-lg mb-4 hover:bg-gray-100">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.summary}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync("content");
  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(`content/${filename}`, "utf-8");
    const { data, content } = matter(fileContent);
    const summary = content.split(".").slice(0, 2).join(".") + ".";

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      summary,
    };
  });

  return {
    props: { posts },
  };
}
