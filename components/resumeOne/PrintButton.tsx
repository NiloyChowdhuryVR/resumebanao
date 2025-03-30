
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button 
      onClick={handlePrint} 
      className="fixed bottom-6 right-6 bg-resume-accent hover:bg-resume-accent/90 text-white print:hidden"
    >
      <FileText className="mr-2" size={16} />
      Download PDF
    </Button>
  );
};

export default PrintButton;
