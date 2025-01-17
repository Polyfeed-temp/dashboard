import { AssignmentView } from "../components/AssignmentView";
import {
  Feedback,
  AnnotationData,
  Assessment,
  AnnotationActionPoint,
} from "../types";
import { useContext, useEffect, useState } from "react";
import { SideMenu } from "../components/SideMenu";
import {
  getFeedbackByAssessmentId,
  deleteHighlight,
  updateHighlightNotes,
} from "../services/feedback.service";
import { toast } from "react-toastify";
import { updateHighlightActionItem } from "../services/actionItem.service";
import { UnitContext } from "../store/UnitContext";
import { UnitSelection } from "../components/UnitSelection";
import { useFileStore } from "../store/fileStore";
import { PDFPreviewModal } from "../components/PDFPreviewModal";
import { motion } from "framer-motion";

export function UnitSummaryPage({
  groupedByUnitCode,
}: {
  groupedByUnitCode: { [key: string]: Feedback[] };
}) {
  // const {unitCode} = useParams();
  const { unit } = useContext(UnitContext);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback>();
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment>();
  const [assessmentDetails, setAssessmentDetails] = useState<Assessment[]>([]);

  const { fetchFilesByFeedbackId, fileList, fetchingListLoading } =
    useFileStore();

  // Add state for PDF preview
  const [selectedPDFFile, setSelectedPDFFile] = useState<{
    content: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (unit) {
      const unitCode = unit?.unitId;
      const feedbacks = unitCode ? groupedByUnitCode[unitCode] : null;
      const temp_data =
        feedbacks
          ?.map((feedback) => ({
            assessmentId: feedback.assessmentId,
            assessmentName: feedback.assessmentName,
          }))
          .sort((a, b) => a.assessmentId - b.assessmentId) || [];
      setAssessmentDetails(temp_data);
    }
    if (unit && selectedAssessment) {
      const status = getFeedbackByAssessmentId(selectedAssessment.assessmentId);
      toast.promise(status, {
        pending: "Loading...",
        success: "Loaded!",
        error: "Error when loading",
      });
      status.then((res) => setSelectedFeedback(res.data as Feedback));
    }
  }, [unit, selectedAssessment]);

  // Fetch files when selectedFeedback changes
  useEffect(() => {
    if (selectedFeedback?.id) {
      fetchFilesByFeedbackId(selectedFeedback.id);
    }
  }, [selectedFeedback]);

  const deleteHighlightFunc = (id: string) => {
    const status = deleteHighlight(id);
    toast.promise(status, {
      pending: "Deleting...",
      success: "Deleted",
      error: "Error when deleting",
    });

    status.then(() =>
      setSelectedFeedback((feedback) => {
        if (feedback) {
          return {
            ...feedback,
            highlights: feedback.highlights?.filter(
              (highlight) => highlight.annotation.id !== id
            ),
          };
        }
        return feedback;
      })
    );
  };

  const editFunc =
    (isAction: boolean) =>
    (
      highlight: AnnotationData,
      originalActionItems?: AnnotationActionPoint[]
    ) => {
      const status = isAction
        ? updateHighlightActionItem(
            highlight.annotation.id,
            highlight.actionItems || [],
            originalActionItems
          )
        : updateHighlightNotes(
            highlight.annotation.id,
            highlight.annotation.notes || ""
          );
      toast.promise(status, {
        pending: "Saving...",
        success: "Saved",
        error: "Error when saving",
      });
      status.then(() =>
        setSelectedFeedback((feedback) => {
          if (feedback) {
            return {
              ...feedback,
              highlights: feedback.highlights?.map((item) =>
                item.annotation.id === highlight.annotation.id
                  ? highlight
                  : item
              ),
            };
          }
          return feedback;
        })
      );
    };

  const handlePDFPreviewClose = () => {
    setSelectedPDFFile(null);
  };

  return (
    <div className="flex flex-wrap min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-full sm:w-1/4 flex-shrink-0 h-screen sticky top-0 overflow-y-auto border-r border-gray-200">
        <div className="p-6 bg-white h-full">
          {/* Unit Selection Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
              Unit Selection
            </h2>
            <UnitSelection
              unitCodes={Object.keys(groupedByUnitCode)}
              disabled={false}
            />
          </div>

          {/* Assessment Menu */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08"
                />
              </svg>
              Select Assessment
            </h2>
            <SideMenu
              title="Select Your Assessment"
              list={assessmentDetails.map(
                (assessment) => assessment.assessmentName
              )}
              listFunc={assessmentDetails.map((assessment) => () => {
                setSelectedAssessment(assessment);
              })}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow w-full sm:w-3/4 p-8 overflow-y-auto">
        {selectedFeedback ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-6"
          >
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <span className="text-gray-500 text-sm">{unit?.unitId}</span>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="text-gray-500 text-sm">
                      {selectedAssessment?.assessmentName}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Assessment Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  {selectedFeedback.assessmentName}
                </h1>
                <div>
                  <AssignmentView
                    feedback={selectedFeedback}
                    deleteHighlightFunc={deleteHighlightFunc}
                    editFunc={editFunc}
                  />
                </div>
              </div>
            </div>

            {/* Files Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    Associated Files
                  </h3>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {fileList.length} {fileList.length === 1 ? "file" : "files"}
                  </span>
                </div>

                {fetchingListLoading ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : fileList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fileList.map((file) => (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        key={file.id}
                        onClick={() =>
                          setSelectedPDFFile({
                            content: file.file_content,
                            name: file.name,
                          })
                        }
                        className="group relative p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-600">
                              {file.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {new Date(file.created_at).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No files available
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No files have been uploaded for this assessment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-theme(spacing.16))]">
            <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No assessment selected
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Please select an assessment from the sidebar to view its details
                and associated files.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      {selectedPDFFile && (
        <PDFPreviewModal
          fileContent={selectedPDFFile.content}
          fileName={selectedPDFFile.name}
          onClose={handlePDFPreviewClose}
          feedbackUrl={selectedFeedback?.url}
        />
      )}
    </div>
  );
}
