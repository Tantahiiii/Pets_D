import React from 'react';
import { BookOpen, Shield, Microscope, Leaf, AlertTriangle, HelpCircle, ExternalLink } from 'lucide-react';

interface ExpertTip {
  title: string;
  description: string;
  icon: React.ElementType;
}

const expertTips: ExpertTip[] = [
  {
    title: 'Scientific Approach',
    description: 'Our recommendations are based on peer-reviewed research and established scientific methodologies in pest control and management.',
    icon: Microscope
  },
  {
    title: 'Environmental Impact',
    description: 'We prioritize eco-friendly solutions that minimize environmental impact while effectively controlling pest populations.',
    icon: Leaf
  },
  {
    title: 'Safety First',
    description: 'All recommended control methods are evaluated for safety, with clear guidelines for proper application and necessary precautions.',
    icon: Shield
  }
];

export function ExpertKnowledge() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Expert Knowledge</h1>
        <p className="mt-2 text-gray-600">
          Access professional pest control recommendations and expert insights
        </p>
      </div>

      {/* Expert Tips Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {expertTips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div
              key={tip.title}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Knowledge Base */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Prevention Guidelines */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Prevention Guidelines
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Habitat Modification</p>
                  <p className="text-gray-600">Reduce conditions that attract pests by managing moisture, removing debris, and sealing entry points.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Regular Monitoring</p>
                  <p className="text-gray-600">Implement routine inspections to detect pest activity early and prevent infestations.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Cultural Practices</p>
                  <p className="text-gray-600">Maintain proper sanitation and implement good agricultural practices to discourage pest establishment.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Treatment Approaches */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Treatment Approaches
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Biological Control</p>
                  <p className="text-gray-600">Utilize natural enemies and beneficial organisms to manage pest populations sustainably.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Chemical Control</p>
                  <p className="text-gray-600">When necessary, use approved pesticides following integrated pest management principles.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Microscope className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Monitoring & Evaluation</p>
                  <p className="text-gray-600">Track treatment effectiveness and adjust strategies based on results and pest response.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Expert Consultation */}
      <div className="bg-green-50 rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Need Expert Help?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose prose-green">
            <p className="text-gray-600">
              For complex pest problems or situations requiring professional intervention, our experts are here to help. Get personalized recommendations and treatment plans tailored to your specific needs.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>Connect with an Expert</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              When to Seek Professional Help
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                Severe or persistent infestations
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                Health and safety concerns
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                Protected or sensitive environments
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                Legal compliance requirements
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}