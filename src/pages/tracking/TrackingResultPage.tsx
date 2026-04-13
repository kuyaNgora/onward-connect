import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTracking } from "@/services/tracking/hooks";
import { TrackingBackground } from "./TrackingBackground";

// POD Gallery Component
const PODGallery = ({ images = [] }: { images: any[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Collect all images (signature + photos)
  const allImages: Array<{ url: string; type: string; note?: string }> = [];
  images.forEach((pod) => {
    if (pod.signature_url) {
      allImages.push({
        url: pod.signature_url,
        type: "signature",
        note: pod.note,
      });
    }
    if (pod.photos && pod.photos.length > 0) {
      pod.photos.forEach((url: string) => {
        allImages.push({ url, type: "photo", note: pod.note });
      });
    }
  });

  if (allImages.length === 0) return null;

  const selectedImage =
    selectedIndex !== null ? allImages[selectedIndex] : null;
  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  return (
    <>
      {/* Gallery Grid */}
      <div className="bg-surface-900/60 backdrop-blur-xl rounded-3xl border border-surface-700/50 overflow-hidden p-6 sm:p-8 mt-8 shadow-2xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
          <div className="p-2 bg-primary-500/10 rounded-lg text-primary-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          Proof Documents
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-2xl overflow-hidden group active:scale-95 transition-all shadow-lg ring-1 ring-surface-700/50 hover:ring-primary-500/50"
            >
              <img
                src={image.url}
                alt={image.type}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-primary-900/20 transition-colors flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300 shadow-xl bg-black/40 p-2.5 rounded-full border border-white/20 backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </div>
              </div>
              {image.type === "signature" && (
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
                  SIGN
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-surface-950/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-surface-400 hover:text-white transition-all bg-surface-800/80 hover:bg-red-500/20 hover:text-red-400 rounded-full border border-surface-700/50 shadow-xl z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt="Proof"
              className="max-w-full max-h-[75vh] object-contain rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-surface-700"
            />
            <div className="mt-8 px-8 py-4 rounded-2xl bg-surface-900/80 border border-surface-700/50 flex items-center gap-8 shadow-2xl backdrop-blur-md">
              <button
                onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                disabled={selectedIndex === 0}
                className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-xl disabled:opacity-30 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7 7" />
                </svg>
              </button>
              <div className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <span className="text-primary-400 text-lg">{selectedIndex + 1}</span>
                <span className="text-surface-600">/</span>
                <span className="text-surface-400">{allImages.length}</span>
              </div>
              <button
                onClick={() =>
                  setSelectedIndex(
                    Math.min(allImages.length - 1, selectedIndex + 1),
                  )
                }
                disabled={selectedIndex === allImages.length - 1}
                className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-xl disabled:opacity-30 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {selectedImage.note && (
              <div className="mt-6 px-6 py-3 bg-surface-900/60 border border-surface-700/50 rounded-xl max-w-md text-center">
                <p className="text-sm text-surface-300 italic font-medium">
                  "{selectedImage.note}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Status badge helper
const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  created: {
    label: "CREATED",
    color: "text-surface-200",
    bg: "bg-surface-700/30 border-surface-600/30",
    dot: "bg-surface-400",
  },
  pending: {
    label: "PENDING",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-500",
  },
  dispatched: {
    label: "DISPATCHED",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-500",
  },
  picked_up: {
    label: "PICKED UP",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    dot: "bg-indigo-500",
  },
  in_transit: {
    label: "IN TRANSIT",
    color: "text-primary-400",
    bg: "bg-primary-500/10 border-primary-500/20",
    dot: "bg-primary-500",
  },
  out_for_delivery: {
    label: "OUT FOR DELIVERY",
    color: "text-accent-400",
    bg: "bg-accent-500/10 border-accent-500/20",
    dot: "bg-accent-500",
  },
  delivered: {
    label: "DELIVERED",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    dot: "bg-green-500",
  },
  completed: {
    label: "COMPLETED",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    dot: "bg-green-500",
  },
  returned: {
    label: "RETURNED",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    dot: "bg-orange-500",
  },
  failed: {
    label: "FAILED",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-500",
  },
};

const statusBadge = (status: string) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className={`px-3 py-1.5 rounded-full ${config.bg} ${config.color} border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {config.label}
    </span>
  );
};

// Waypoint status icons
const WaypointIcon = ({ status, className = "" }: { status: string, className?: string }) => {
  switch(status) {
    case 'created':
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      );
    case 'picked_up':
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case 'in_transit':
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      );
    case 'out_for_delivery':
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'delivered':
    case 'completed':
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'failed':
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    case 'returned':
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      );
    default:
      return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      );
  }
};

// Date formatter
const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const WaypointTimeline = ({
  waypoint_history = [],
  waypoint_images = [],
}: {
  waypoint_history: any[];
  waypoint_images?: any[];
}) => {
  if (!waypoint_history || waypoint_history.length === 0) {
    return (
      <div className="bg-surface-900/60 backdrop-blur-xl rounded-3xl p-12 text-center border border-surface-700/50">
        <div className="text-5xl mb-6 opacity-50 animate-bounce">⏳</div>
        <p className="text-sm font-bold text-surface-400 uppercase tracking-widest">
          Awaiting Status Updates
        </p>
      </div>
    );
  }

  const sortedLogs = [...waypoint_history].sort(
    (a, b) =>
      new Date(b.changed_at).getTime() - new Date(a.changed_at).getTime(),
  );

  const getWaypointImage = (waypointId: string) => {
    return waypoint_images?.find((img: any) => img.waypoint_id === waypointId);
  };

  return (
    <div className="bg-surface-900/60 backdrop-blur-xl rounded-3xl border border-surface-700/50 overflow-hidden shadow-2xl">
      <div className="px-8 py-5 border-b border-surface-700/50 bg-surface-800/30 flex items-center justify-between">
        <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3">
          <div className="p-2 bg-primary-500/10 rounded-lg text-primary-400 shadow-[0_0_15px_rgba(var(--color-primary-500),0.2)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Journey Log
        </h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(var(--color-primary-500),0.1)]">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400" />
          </div>
          LIVE
        </div>
      </div>

      <div className="p-8">
        <div className="relative pl-4">
          {/* Vertical line gradient */}
          <div className="absolute left-[35px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-primary-500 via-surface-700 to-transparent rounded-full opacity-60" />

          <div className="space-y-10">
            {sortedLogs.map((log, index) => {
              const isLatest = index === 0;
              const waypointImage = getWaypointImage(log.waypoint_id);

              return (
                <div
                  key={`${log.waypoint_id}-${index}`}
                  className="relative flex items-start space-x-8 group"
                >
                  {/* Status dot / icon */}
                  <div
                    className={`relative z-10 flex-shrink-0 h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isLatest
                        ? "bg-primary-500 text-white shadow-[0_0_20px_rgba(var(--color-primary-500),0.4)] scale-110 rotate-3"
                        : "bg-surface-800 text-surface-400 border border-surface-700 group-hover:bg-surface-700 group-hover:scale-105"
                    }`}
                  >
                    <WaypointIcon status={log.status} className={isLatest ? "text-white" : ""} />
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 min-w-0 bg-surface-800/20 rounded-2xl p-5 border transition-all duration-300 ${
                    isLatest ? "border-primary-500/30 bg-primary-500/5 shadow-xl" : "border-surface-700/50 group-hover:bg-surface-800/40"
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <div>
                        <p className={`text-base font-black tracking-wide ${isLatest ? "text-white" : "text-surface-100"}`}>
                          {log.location_name || log.address || ""}
                        </p>
                        <p className="text-[11px] font-medium text-surface-400 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {formatDate(log.changed_at)}
                        </p>
                      </div>
                      <div className="self-start sm:self-auto shrink-0">
                         {statusBadge(log.status)}
                      </div>
                    </div>

                    {log.location_name && log.address && (
                      <p className="text-xs text-surface-300 mb-4 leading-relaxed flex items-start gap-2">
                        <svg className="w-4 h-4 text-surface-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {log.address}
                      </p>
                    )}

                    {/* Waypoint thumbnail if has image */}
                    {waypointImage &&
                      waypointImage.photos &&
                      waypointImage.photos.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mb-4 mt-2">
                          {waypointImage.photos
                            .slice(0, 6)
                            .map((photo: string, i: number) => (
                              <div
                                key={i}
                                className="relative aspect-square rounded-xl overflow-hidden shadow-md ring-1 ring-surface-700 hover:ring-primary-500/50 transition-all cursor-pointer group/photo"
                              >
                                <img
                                  src={photo}
                                  alt={`Waypoint photo ${i + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/40 transition-colors flex items-center justify-center">
                                  <div className="text-white opacity-0 group-hover/photo:opacity-100 transition-opacity transform group-hover/photo:scale-110 bg-black/40 p-1.5 rounded-full border border-white/20 backdrop-blur-sm shadow-xl">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                    {log.notes && (
                      <div className="mt-3 inline-flex px-4 py-2 bg-surface-950/50 rounded-xl border border-surface-700/50 shadow-inner">
                        <p className="text-xs text-surface-300">
                          <span className="font-black text-primary-400 mr-2 tracking-widest text-[10px]">
                            NOTE
                          </span>
                          {log.notes}
                        </p>
                      </div>
                    )}

                    {/* POD info for delivery */}
                    {log.status === "completed" &&
                      log.type === "delivery" &&
                      waypointImage?.received_by && (
                        <div className="mt-4 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                           <div className="text-xs font-black text-green-400 flex items-center gap-2 uppercase tracking-wide">
                             <div className="p-1.5 bg-green-500/20 rounded-lg">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                             </div>
                             Handed to: <span className="text-white">{waypointImage.received_by}</span>
                           </div>
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TrackingResultPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const { getTrackingByOrderNumber, getTrackingByOrderNumberResult } =
    useTracking();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [orderNumber]);

  // Fetch tracking data on mount
  useEffect(() => {
    if (orderNumber) {
      getTrackingByOrderNumber(orderNumber);
    }
  }, [orderNumber, getTrackingByOrderNumber]);

  const { data, error, isLoading } = getTrackingByOrderNumberResult;
  const trackingData = data?.data;

  const handleBack = () => {
    navigate("/lacak");
  };

  return (
    <>
      <Helmet>
        <title>Track {orderNumber} | Onward Connect</title>
        <meta
          name="description"
          content={`Tracking result for order ${orderNumber}`}
        />
      </Helmet>

      {/* Beautiful Animated Background */}
      <TrackingBackground />

      {/* Content */}
      <div className="min-h-screen mt-10 py-10 sm:py-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto block xl:max-w-5xl transition-all duration-500">

          {/* Header Action */}
          <div className="mb-8 flex justify-between items-center">
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-surface-900/60 backdrop-blur-md border border-surface-700/50 rounded-full text-[11px] font-black text-surface-300 uppercase tracking-widest hover:text-white hover:bg-primary-500/20 hover:border-primary-500/50 transition-all shadow-lg"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary-400 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              New Search
            </button>

            {trackingData && (
              <div className="hidden sm:flex text-[10px] font-bold text-surface-400 uppercase tracking-widest bg-surface-900/60 backdrop-blur-md px-4 py-2 border border-surface-700/50 rounded-full shadow-lg items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                System Online
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-8 animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-surface-900/60 rounded-3xl p-8 border border-surface-700/50 h-48" />
                <div className="bg-surface-900/60 rounded-3xl p-6 border border-surface-700/50 h-48" />
              </div>
              <div className="bg-surface-900/60 rounded-3xl p-8 border border-surface-700/50 h-96" />
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-surface-900/60 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5" />
              <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)] rotate-12 relative z-10">
                <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-widest relative z-10">
                Order Not Found
              </h2>
              <p className="text-sm text-surface-400 text-center mb-10 max-w-sm relative z-10 leading-relaxed">
                We couldn't retrieve tracking information for <strong className="text-white">"{orderNumber}"</strong>. Please verify the tracking number and try again.
              </p>
              <button
                onClick={handleBack}
                className="px-8 py-4 gradient-primary border border-primary-500/50 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-1 transition-all relative z-10"
              >
                Enter Another Code
              </button>
            </div>
          )}

          {/* Result Content */}
          {trackingData && !isLoading && (
            <div className="space-y-6 animate-fade-in pb-12">

              {/* Bento Grid Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Order Highlight (Spans 2 columns on desktop) */}
                <div className="md:col-span-2 bg-gradient-to-br from-surface-900/80 to-surface-900/40 backdrop-blur-xl rounded-3xl p-8 border border-surface-700/50 shadow-2xl relative overflow-hidden group">
                  {/* Decorative background watermark */}
                  <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                    <svg className="w-64 h-64 text-primary-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                       <div className="flex flex-wrap gap-2">
                         <div className="px-4 py-1.5 bg-surface-950/60 border border-surface-700/50 rounded-full text-[10px] font-black text-surface-300 uppercase tracking-widest flex items-center gap-2 shadow-inner">
                           <svg className="w-3 h-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                           {trackingData.order_number || orderNumber}
                         </div>
                         {trackingData.ref_code && (
                           <div className="px-4 py-1.5 bg-surface-950/60 border border-surface-700/50 rounded-full text-[10px] font-black text-surface-300 uppercase tracking-widest flex items-center gap-2 shadow-inner">
                             REF: {trackingData.ref_code}
                           </div>
                         )}
                       </div>
                       {statusBadge(trackingData.status)}
                    </div>

                    <div>
                      <h3 className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-1.5">Recipient</h3>
                      <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight uppercase leading-none drop-shadow-md">
                        {trackingData.customer_name || "Shipment"}
                      </h2>
                      {trackingData.order_type && (
                        <div className="inline-block mt-4 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-[10px] font-black text-purple-400 uppercase tracking-widest">
                          TYPE: {trackingData.order_type}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Logistics Info Card */}
                <div className="bg-surface-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-surface-700/50 shadow-xl flex flex-col gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-1">Issue Date</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                       <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       {formatDate(trackingData.created_at || new Date().toISOString())}
                    </p>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-surface-700 to-transparent relative z-10" />

                  <div className="relative z-10 space-y-4">
                    {trackingData.driver && (
                       <div>
                         <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                           Driver
                         </p>
                         <p className="text-sm font-bold text-white uppercase">{trackingData.driver.name}</p>
                       </div>
                    )}

                    {trackingData.vehicle && (
                       <div>
                         <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                           Vehicle Plate
                         </p>
                         <p className="text-sm font-black text-primary-400 uppercase tracking-wider">{trackingData.vehicle.plate_number}</p>
                       </div>
                    )}

                    {!trackingData.driver && !trackingData.vehicle && (
                       <div className="h-full flex items-center justify-center p-4 bg-surface-800/30 rounded-xl border border-surface-700 border-dashed">
                         <p className="text-[10px] text-surface-400 uppercase tracking-widest text-center">No driver assigned</p>
                       </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Waypoint Timeline */}
              <WaypointTimeline
                waypoint_history={trackingData.waypoint_history || []}
                waypoint_images={trackingData.waypoint_images || []}
              />

              {/* POD Gallery */}
              {trackingData.waypoint_images && (
                <PODGallery images={trackingData.waypoint_images} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
