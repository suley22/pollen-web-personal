import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Award} from "lucide-react";
import { useState } from "react";
import { Plus } from "lucide-react";


export default function RecognitionTab( ) {
  const [expandedSection, setExpandedSection] = useState(null);
  
  return (
            <Card className={"p-6"}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{fontFamily: 'Sora'}}>Awards & Recognition</CardTitle>
                  <Button 
                    onClick={() => setExpandedSection(expandedSection === 'recognition' ? null : 'recognition')}
                    variant="outline"
                    style={{fontFamily: 'Sora'}}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Recognition
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {expandedSection === 'recognition' ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3" style={{fontFamily: 'Sora'}}>Add New Recognition</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Award/Recognition Title</label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Best Places to Work 2024" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Awarding Organisation</label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Great Place to Work Institute" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year Received</label>
                          <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="2024" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea className="w-full p-2 border border-gray-300 rounded-md h-20" placeholder="Brief description of the recognition..."/>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" style={{fontFamily: 'Sora'}}>Save Recognition</Button>
                          <Button size="sm" variant="outline" onClick={() => setExpandedSection(null)} style={{fontFamily: 'Sora'}}>Cancel</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600" style={{fontFamily: 'Poppins'}}>
                      Highlight your company awards, certifications, and industry recognition to stand out to candidates.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
      
  );
}