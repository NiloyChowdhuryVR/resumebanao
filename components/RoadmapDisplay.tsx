interface RoadmapDisplayProps {
  roadmap: string;
}

const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({ roadmap }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Roadmap:</h2>
      <pre className="whitespace-pre-wrap">{roadmap}</pre>
    </div>
  );
};

export default RoadmapDisplay;
