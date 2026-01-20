import Link from 'next/link';
import { motion } from 'framer-motion';

interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Subcategory[];
}

interface MegaMenuProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ category, isOpen, onClose }: MegaMenuProps) {
  // Render logic for grouping
  const groups = (category as any).groups;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50 origin-top"
      onMouseLeave={onClose}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Header / Main Link */}
          <div className="col-span-1 border-l-2 border-gold-100 pl-6">
            <h3 className="text-xl font-bold text-navy-900 mb-4">
              {category.name}
            </h3>
            <Link
              href={`/articles?category=${category.slug}`}
              className="text-gold-600 hover:text-gold-700 font-medium flex items-center gap-2 group">
              عرض الكل
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>
            </Link>
          </div>

          <div className="col-span-3">
            {groups ? (
              <div className="grid grid-cols-3 gap-8">
                {groups.map((group: any, idx: number) => (
                  <div key={idx}>
                    {group.title && (
                      <h4 className="font-bold text-navy-800 mb-3 border-b border-gray-100 pb-2">
                        {group.title}
                      </h4>
                    )}
                    <div className="flex flex-col gap-2">
                      {group.items.map((sub: any) => (
                        <Link
                          key={sub.id || sub.slug}
                          href={`/category/${category.slug}/${sub.slug}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition-colors py-1 hover:translate-x-1 duration-200"
                          onClick={onClose}>
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-300"></span>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                {category.subcategories?.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${category.slug}/${sub.slug}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition-colors p-2 rounded-lg hover:bg-gold-50/50"
                    onClick={onClose}>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
