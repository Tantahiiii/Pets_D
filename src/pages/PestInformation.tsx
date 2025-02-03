import React, { useState, useMemo } from 'react';
import { Search, Bug, ExternalLink, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import type { Pest } from '../types';

// Complete pest information
const mockPests: Pest[] = [
  {
    
      id: 'yellow-rice-borer',
      common_name: 'Yellow Rice Borer',
      scientific_name: 'Scirpophaga incertulas',
      description: 'A serious pest of rice crops that bores into rice stems, causing "deadhearts" in young plants and "whiteheads" in older ones. The larvae feed inside the stem, disrupting nutrient flow.',
      image_url: 'https://mybucket-aws02-asd.s3.us-east-1.amazonaws.com/Yellow+Rice+Borer.png', // แก้ไข URL ตามความเหมาะสม
      category: 'Moth',
      threat_level: 'High',
      created_at: new Date().toISOString()
  
  
  },
  {
    id: 'weevil',
    common_name: 'Rice Weevil',
    scientific_name: 'Sitophilus oryzae',
    description: 'A major stored grain pest that attacks rice, wheat, and other cereals. Adult weevils bore into stored grains to lay eggs, while larvae develop inside, causing significant post-harvest losses.',
    image_url: 'https://images.unsplash.com/photo-1589908238257-45189f8f4f72?auto=format&fit=crop&q=80&w=800',
    category: 'Beetle',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'wasp',
    common_name: 'Rice Field Wasp',
    scientific_name: 'Anagrus spp.',
    description: 'While most wasps in rice fields are beneficial as natural enemies of pest insects, some species can damage rice plants. They are important in the ecosystem balance.',
    image_url: 'https://images.unsplash.com/photo-1612051855172-d2284f52649c?auto=format&fit=crop&q=80&w=800',
    category: 'Wasp',
    threat_level: 'Low',
    created_at: new Date().toISOString()
  },
  {
    id: 'snail',
    common_name: 'Golden Apple Snail',
    scientific_name: 'Pomacea canaliculata',
    description: 'An invasive species that feeds on young rice seedlings, causing significant damage in wetland rice. They can destroy newly transplanted rice fields within days.',
    image_url: 'https://images.unsplash.com/photo-1581696192413-439d7f1a7f54?auto=format&fit=crop&q=80&w=800',
    category: 'Snail',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'small-brown-planthopper',
    common_name: 'Small Brown Planthopper',
    scientific_name: 'Laodelphax striatellus',
    description: 'Smaller than the brown planthopper but equally damaging. They transmit viral diseases and cause direct feeding damage to rice plants.',
    image_url: 'https://images.unsplash.com/photo-1616690248364-58e5326dea56?auto=format&fit=crop&q=80&w=800',
    category: 'Bug',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'slug',
    common_name: 'Rice Field Slug',
    scientific_name: 'Deroceras reticulatum',
    description: 'These mollusks feed on rice seedlings and young plants, particularly in wet conditions. They are most active at night and leave slime trails.',
    image_url: 'https://images.unsplash.com/photo-1515169273894-7e876dcf13da?auto=format&fit=crop&q=80&w=800',
    category: 'Slug',
    threat_level: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'rice-leafhopper',
    common_name: 'Rice Leafhopper',
    scientific_name: 'Nephotettix spp.',
    description: 'Both nymphs and adults suck plant sap from leaves and leaf sheaths. They are important vectors of viral diseases like rice tungro disease.',
    image_url: 'https://images.unsplash.com/photo-1572539280469-9c738c59964d?auto=format&fit=crop&q=80&w=800',
    category: 'Bug',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'rice-leaf-roller',
    common_name: 'Rice Leaf Roller',
    scientific_name: 'Cnaphalocrocis medinalis',
    description: 'The larvae fold rice leaves longitudinally and feed inside the fold, reducing photosynthetic area. Heavy infestations can cause significant yield loss.',
    image_url: 'https://images.unsplash.com/photo-1563482776068-4dac10f9373d?auto=format&fit=crop&q=80&w=800',
    category: 'Moth',
    threat_level: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'rice-gall-midge',
    common_name: 'Rice Gall Midge',
    scientific_name: 'Orseolia oryzae',
    description: 'The larvae cause the rice tillers to form a tubular gall called "silver shoot" or "onion shoot", preventing panicle formation. Severely affected fields show stunted growth.',
    image_url: 'https://images.unsplash.com/photo-1558015244-6bdea8ef48ca?auto=format&fit=crop&q=80&w=800',
    category: 'Fly',
    threat_level: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'moth',
    common_name: 'Rice Moth',
    scientific_name: 'Corcyra cephalonica',
    description: 'A serious pest of stored rice and other grains. Larvae feed on grain kernels and create webbing that can bind kernels together.',
    image_url: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?auto=format&fit=crop&q=80&w=800',
    category: 'Moth',
    threat_level: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'grasshopper',
    common_name: 'Rice Grasshopper',
    scientific_name: 'Oxya spp.',
    description: 'Defoliators that can cause severe damage to rice crops, especially during the vegetative stage. They feed on leaves, creating irregular patterns of damage.',
    image_url: 'https://images.unsplash.com/photo-1546272989-40c92939c6c2?auto=format&fit=crop&q=80&w=800',
    category: 'Grasshopper',
    threat_level: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'earwig',
    common_name: 'Rice Field Earwig',
    scientific_name: 'Euborellia stali',
    description: 'These nocturnal insects can be both beneficial and harmful. While they prey on some rice pests, they may also damage young rice plants.',
    image_url: 'https://images.unsplash.com/photo-1567844768957-97881ef5d1a9?auto=format&fit=crop&q=80&w=800',
    category: 'Earwig',
    threat_level: 'Low',
    created_at: new Date().toISOString()
  },
  {
    id: 'earthworms',
    common_name: 'Rice Field Earthworm',
    scientific_name: 'Pheretima spp.',
    description: 'Generally beneficial organisms that improve soil structure and fertility, but high populations in rice paddies can sometimes disrupt young rice roots.',
    image_url: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&q=80&w=800',
    category: 'Worm',
    threat_level: 'Low',
    created_at: new Date().toISOString()
  },
  {
    id: 'caterpillar',
    common_name: 'Rice Swarming Caterpillar',
    scientific_name: 'Spodoptera mauritia',
    description: 'Larvae feed voraciously on rice leaves, especially during the vegetative stage. Large populations can completely defoliate rice plants.',
    image_url: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?auto=format&fit=crop&q=80&w=800',
    category: 'Moth',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'brown-planthopper',
    common_name: 'Brown Planthopper',
    scientific_name: 'Nilaparvata lugens',
    description: 'One of the most serious rice pests in Asia. It damages plants by sucking sap and can transmit viral diseases. Large populations can cause "hopper burn" where patches of rice plants turn brown and die.',
    image_url: 'https://images.unsplash.com/photo-1616690248364-58e5326dea56?auto=format&fit=crop&q=80&w=800',
    category: 'Bug',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'beetle',
    common_name: 'Rice Black Bug',
    scientific_name: 'Scotinophara coarctata',
    description: 'Both adults and nymphs suck sap from the base of the rice plant, causing yellowing and wilting. Heavy infestations can lead to "bugburn".',
    image_url: 'https://images.unsplash.com/photo-1562907550-096d3bf9b25c?auto=format&fit=crop&q=80&w=800',
    category: 'Beetle',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'bees',
    common_name: 'Rice Field Bee',
    scientific_name: 'Apis spp.',
    description: 'Generally beneficial insects that help with pollination of surrounding crops. They may visit rice fields for water or nectar from weeds.',
    image_url: 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?auto=format&fit=crop&q=80&w=800',
    category: 'Bee',
    threat_level: 'Low',
    created_at: new Date().toISOString()
  },
  {
    id: 'asiatic-rice-borer',
    common_name: 'Asiatic Rice Borer',
    scientific_name: 'Chilo suppressalis',
    description: 'Larvae bore into rice stems, causing deadhearts in vegetative stage and whiteheads in reproductive stage. A major pest in many Asian rice-growing regions.',
    image_url: 'https://images.unsplash.com/photo-1584880640557-608513eab0a2?auto=format&fit=crop&q=80&w=800',
    category: 'Moth',
    threat_level: 'High',
    created_at: new Date().toISOString()
  },
  {
    id: 'ants',
    common_name: 'Rice Field Ant',
    scientific_name: 'Solenopsis geminata',
    description: 'Can be both beneficial and harmful. They prey on some rice pests but may also protect and tend honeydew-producing insects like planthoppers.',
    image_url: 'https://images.unsplash.com/photo-1611866865596-06eb7a21ca32?auto=format&fit=crop&q=80&w=800',
    category: 'Ant',
    threat_level: 'Low',
    created_at: new Date().toISOString()
  }
];

const categories = ['All', 'Ant', 'Bee', 'Beetle', 'Bug', 'Earwig', 'Fly', 'Grasshopper', 'Moth', 'Snail', 'Slug', 'Wasp', 'Worm'];
const threatLevels = ['All', 'Low', 'Medium', 'High'];

type SortField = 'common_name' | 'scientific_name' | 'threat_level';
type SortOrder = 'asc' | 'desc';

export function PestInformation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPest, setSelectedPest] = useState<Pest | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedThreatLevel, setSelectedThreatLevel] = useState('All');
  const [sortField, setSortField] = useState<SortField>('common_name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedPests = useMemo(() => {
    return mockPests
      .filter(pest => {
        const matchesSearch = 
          pest.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pest.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pest.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = 
          selectedCategory === 'All' || pest.category === selectedCategory;
        
        const matchesThreatLevel = 
          selectedThreatLevel === 'All' || pest.threat_level === selectedThreatLevel;

        return matchesSearch && matchesCategory && matchesThreatLevel;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  }, [searchQuery, selectedCategory, selectedThreatLevel, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pest Information</h1>
        <p className="mt-2 text-gray-600">
          Learn about various pests and their characteristics
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, scientific name, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 px-3"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Threat Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Threat Level
              </label>
              <select
                value={selectedThreatLevel}
                onChange={(e) => setSelectedThreatLevel(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 px-3"
              >
                {threatLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSort('common_name')}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    sortField === 'common_name' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-sm">Name</span>
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </button>
                <button
                  onClick={() => toggleSort('threat_level')}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    sortField === 'threat_level' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-sm">Threat</span>
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pest List */}
        <div className="space-y-4">
          {filteredAndSortedPests.map(pest => (
            <button
              key={pest.id}
              onClick={() => setSelectedPest(pest)}
              className={`
                w-full text-left p-4 rounded-lg transition-all
                ${selectedPest?.id === pest.id
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-white border border-gray-200 hover:border-green-500'}
              `}
            >
              <div className="flex items-start gap-4">
                <img
                  src={pest.image_url}
                  alt={pest.common_name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {pest.common_name}
                      </h3>
                      <p className="text-sm text-gray-500 italic">
                        {pest.scientific_name}
                      </p>
                    </div>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${pest.threat_level === 'High' ? 'bg-red-100 text-red-700' :
                        pest.threat_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'}
                    `}>
                      {pest.threat_level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {pest.description}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {pest.category}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {filteredAndSortedPests.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
              <Bug className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">No pests found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Pest Details */}
        <div className="md:sticky md:top-4 h-fit">
          {selectedPest ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src={selectedPest.image_url}
                alt={selectedPest.common_name}
                className="w-full aspect-video object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedPest.common_name}
                  </h2>
                  <p className="text-gray-500 italic">
                    {selectedPest.scientific_name}
                  </p>
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${selectedPest.threat_level === 'High' ? 'bg-red-100 text-red-700' :
                    selectedPest.threat_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'}
                `}>
                  {selectedPest.threat_level} Threat
                </span>
              </div>
              
              <div className="prose prose-green">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedPest.description}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Identification Tips
                </h3>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Look for distinctive coloring and markings</li>
                  <li>Observe behavior and movement patterns</li>
                  <li>Note the size and shape of the pest</li>
                  <li>Consider the habitat and location found</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Control Methods
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Natural predators and biological control</li>
                  <li>Cultural control methods</li>
                  <li>Chemical control options</li>
                  <li>Preventive measures</li>
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <a
                    href="#"
                    className="inline-flex items-center text-green-600 hover:text-green-700"
                  >
                    <span>Learn more about control methods</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <Bug className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">
                Select a pest to view detailed information
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}