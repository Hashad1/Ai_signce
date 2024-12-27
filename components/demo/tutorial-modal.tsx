"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { tutorialSteps } from "./tutorial-steps";
import { StepContent } from "./step-content";

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
}

export function TutorialModal({ open, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogTitle className="sr-only">
          كيفية استخدام الباحث العلمي - {currentStepData.title}
        </DialogTitle>

        <StepContent {...currentStepData} />

        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="text-white hover:text-primary"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            السابق
          </Button>
          <Button
            onClick={handleNext}
            className="text-white neon-glow"
          >
            {currentStep === tutorialSteps.length - 1 ? "إنهاء" : "التالي"}
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}