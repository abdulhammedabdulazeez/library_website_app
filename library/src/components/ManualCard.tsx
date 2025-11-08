interface ManualCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link?: string;
}

export const ManualCard = ({
  imageSrc,
  title,
  description,
  link,
}: ManualCardProps) => {
  return (
    <div className="relative h-72 rounded-2xl overflow-hidden group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-bold mb-2 hover:underline inline-block"
          >
            {title}
          </a>
        ) : (
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
        )}
        <p className="text-sm font-light">{description}</p>
      </div>
    </div>
  );
};
