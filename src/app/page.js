export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">English</h2>
            <textarea 
              className="textarea textarea-bordered w-full h-32" 
              placeholder="Enter text to translate..."
            />
          </div>
        </div>
        
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Korean</h2>
            <div className="textarea textarea-bordered w-full h-32 bg-base-100">
              Translation will appear here...
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex justify-center">
        <button className="btn btn-primary">
          Translate
        </button>
      </div>
    </div>
  );
}
