export default function BlogCard({ title, summary, link }: any) {
  return (
    <a href={link}>
      <div className="border p-4 mb-4 rounded-md hover:bg-gray-100">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{summary}</p>
      </div>
    </a>
  );
}
