import React from 'react';
import { Bug, Upload, Search, Shield, Award, Users, BookOpen, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Bug,
      title: 'Pest Information',
      description: 'Access detailed information about various insects and pests.',
      href: '/pests'
    },
    {
      icon: Upload,
      title: 'Image Detection',
      description: 'Upload images to identify pests using advanced AI technology.',
      href: '/detect'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Quickly find specific pest information using our search feature.',
      href: '/pests'
    },
    {
      icon: Shield,
      title: 'Expert Knowledge',
      description: 'Get reliable pest identification and control recommendations.',
      href: '/expert'
    },
  ];

  const stats = [
    { number: '99%', label: 'Accuracy Rate' },
    { number: '10K+', label: 'Pest Species' },
    { number: '24/7', label: 'Support' },
    { number: '50K+', label: 'Users' }
  ];

  const testimonials = [
    {
      quote: "This tool has revolutionized how we identify and manage pests in our agricultural operations.",
      author: "Sarah Johnson",
      role: "Agricultural Specialist"
    },
    {
      quote: "The instant pest identification feature has saved us countless hours in pest management.",
      author: "Michael Chen",
      role: "Farm Manager"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-[600px] flex items-center -mt-8 px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1530983822321-fcac2d3c0f06?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>
        
        <div className="container mx-auto relative text-center">
          <h1 className="text-4xl font-bold text-white sm:text-6xl mb-6">
            Welcome to PestDetect
          </h1>
          <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
            Your intelligent companion for pest identification and management.
            Upload images, get instant identification, and access detailed information about various pests.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/detect"
              className="rounded-md bg-green-600 px-8 py-4 text-white hover:bg-green-700 transition transform hover:scale-105"
            >
              Start Detection
            </a>
            <a
              href="/pests"
              className="rounded-md bg-white bg-opacity-20 backdrop-blur-sm px-8 py-4 text-white hover:bg-opacity-30 transition transform hover:scale-105"
            >
              Browse Pests
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 bg-green-50 rounded-xl">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-green-600">{stat.number}</p>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <a
                key={feature.title}
                href={feature.href}
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group hover:-translate-y-1 duration-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Upload,
              title: "Upload Image",
              description: "Take a photo or upload an existing image of the pest you want to identify."
            },
            {
              icon: Search,
              title: "AI Analysis",
              description: "Our advanced AI system analyzes the image and identifies the pest species."
            },
            {
              icon: BookOpen,
              title: "Get Information",
              description: "Receive detailed information about the pest and control recommendations."
            }
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-5 h-8 w-8 text-green-600 transform -translate-y-1/2 z-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-green-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust PestDetect for accurate pest identification and management solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-green-600 hover:bg-green-50 transition"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/expert"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
            >
              Talk to Expert
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose PestDetect?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Accurate Identification",
                description: "Advanced AI technology ensures precise pest identification"
              },
              {
                title: "Expert Knowledge",
                description: "Access to professional pest control recommendations"
              },
              {
                title: "Time Saving",
                description: "Get instant results and actionable insights"
              },
              {
                title: "Comprehensive Database",
                description: "Information on thousands of pest species"
              },
              {
                title: "Regular Updates",
                description: "Constantly updated pest information and features"
              },
              {
                title: "24/7 Support",
                description: "Get help whenever you need it"
              }
            ].map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}