import React from 'react';

export default function SetupRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-serif text-primary mb-4 text-center">Setup Required</h1>
        
        <p className="text-sm text-gray-600 mb-6 text-center">
          The Supabase connection variables are missing. To run this application, you need to connect it to a Supabase project.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
            <p className="font-semibold mb-2">1. Create a `.env` file in the root directory</p>
            <p className="mb-2">Copy `.env.example` to `.env` and fill in your keys:</p>
            <code className="block bg-gray-200 p-2 rounded text-xs">
              VITE_SUPABASE_URL=your_project_url<br/>
              VITE_SUPABASE_ANON_KEY=your_anon_key
            </code>
          </div>

          <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
            <p className="font-semibold mb-2">2. Run Migrations</p>
            <p>Run the SQL scripts located in the <code className="bg-gray-200 px-1 rounded text-xs">supabase/</code> folder in your Supabase SQL editor to create the tables, seed data, and set up security policies.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
            <p className="font-semibold mb-2">3. Setup Admin User</p>
            <p>In Supabase Auth, sign up a user with email <code className="bg-gray-200 px-1 rounded text-xs">jarh8590@gmail.com</code> and password <code className="bg-gray-200 px-1 rounded text-xs">admin@221425</code> to match your requirements.</p>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="mt-6 w-full bg-primary text-white py-3 rounded-none font-medium hover:bg-gray-800 transition-colors"
        >
          I've set it up, reload page
        </button>
      </div>
    </div>
  );
}
