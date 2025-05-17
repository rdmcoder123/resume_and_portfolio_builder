import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortfolioTemplatesProps {
  currentTemplate: string;
  onSelect: (template: string) => void;
  onClose: () => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean, professional design with a light background and blue accents.',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'A simple, elegant design focusing on content with minimal styling.',
    image: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold, colorful design with a dark background and vibrant gradient accents.',
    image: 'https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function PortfolioTemplates({ currentTemplate, onSelect, onClose }: PortfolioTemplatesProps) {
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-muted transition-colors"
            aria-label="Back to Portfolio Editor"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Choose a Template</h1>
            <p className="text-muted-foreground text-sm">
              Select a template for your portfolio website
            </p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`card overflow-hidden ${
                currentTemplate === template.name ? 'ring-2 ring-primary-foreground' : ''
              }`}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{template.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <button
                  onClick={() => onSelect(template.name)}
                  className={`w-full ${
                    currentTemplate === template.name
                      ? 'btn btn-primary'
                      : 'btn btn-outline'
                  }`}
                >
                  {currentTemplate === template.name ? 'Selected' : 'Select Template'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}