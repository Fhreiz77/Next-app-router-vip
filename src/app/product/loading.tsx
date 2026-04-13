export default function Loading() {
  return (
    <div>
      <div className="grid grid-cols-4 mt-5 place-items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-sm bg-gray-400 rounded-lg shadow my-5 h-96 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
