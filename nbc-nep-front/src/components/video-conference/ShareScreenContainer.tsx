import { PropsWithChildren, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { currentLayoutIndex, getGridStyle } from "./lib/dnd";
import { GridStatusType, GuideStatusType } from "./types/ScreenShare.types";
import ShareScreenDragItem from "./ShareScreenDragItem";

const EDGE_AREA_RATE = 220;

interface Props {
  children: JSX.Element[];
  handleToggleVideosLayout: () => void;
}
export default function ShareScreenContainer({
  children,
  handleToggleVideosLayout,
}: PropsWithChildren<Props>) {
  // 비디오 상태관리
  const [videos, setVideos] = useState<(JSX.Element | null)[]>(children);
  const [selectVideos, setSelectVideos] = useState<(JSX.Element | null)[]>([]);

  // 가이드 상태
  const [currentGuide, setCurrentGuide] = useState<GuideStatusType | null>(
    null
  );

  // 그리드 상태
  const [currentGrid, setCurrentGrid] = useState<GridStatusType | null>(null);

  // hover가 되었을 때 가이드의 보이는 여부 상태
  const [showGuide, setShowGuide] = useState(false);

  // 레이아웃 컨테이너
  const dropParentRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // active 상태인 아이템을 클릭 시 inactive 상태로
  const handleInactive = (id: string) => {
    setVideos((prev) => [
      ...prev,
      children.findLast((child) => child.key === id)!,
    ]);
    setSelectVideos((prev) =>
      prev.map((video) => {
        if (video?.key === id) {
          return null;
        }
        return video;
      })
    );
  };

  const [, drop] = useDrop({
    accept: "VIDEO",
    hover: (item, monitor) => {
      if (!dropParentRef.current) {
        return;
      }
      //마우스 호버 아웃 체크
      clearTimeout(hoverTimer?.current!);
      // 부모 컴포넌트의 좌표
      const parentRect = dropParentRef.current.getBoundingClientRect();
      // 현재 마우스 좌표
      const clientOffset = monitor.getClientOffset();
      // 부모 컴포넌트 기준 y축 좌표
      const hoverClientY = clientOffset!.y - parentRect.top;
      // 부모 컴포넌트 기준 x축 좌표
      const hoverClientX = clientOffset!.x - parentRect.left;

      // 좌측
      if (hoverClientX < EDGE_AREA_RATE) {
        if (hoverClientY < EDGE_AREA_RATE) {
          setCurrentGuide("left-top");
          setShowGuide(true);
        } else if (hoverClientY > parentRect.height - EDGE_AREA_RATE) {
          setCurrentGuide("left-bottom");
          setShowGuide(true);
        } else {
          setCurrentGuide("left");
          setShowGuide(true);
        }
      } else if (hoverClientX > parentRect.width - EDGE_AREA_RATE) {
        // 우측
        if (hoverClientY < EDGE_AREA_RATE) {
          setCurrentGuide("right-top");
          setShowGuide(true);
        } else if (hoverClientY > parentRect.height - EDGE_AREA_RATE) {
          setCurrentGuide("right-bottom");
          setShowGuide(true);
        } else {
          setCurrentGuide("right");
          setShowGuide(true);
        }
      } else if (hoverClientY < EDGE_AREA_RATE) {
        setCurrentGuide("top");
        setShowGuide(true);
      } else if (hoverClientY > parentRect.height - EDGE_AREA_RATE) {
        setCurrentGuide("bottom");
        setShowGuide(true);
      } else {
        setCurrentGuide("center");
        setShowGuide(true);
      }

      hoverTimer.current = setTimeout(() => {
        setCurrentGuide(null);
        setShowGuide(false);
      }, 150);
    },

    drop: (item: { id: string }) => {
      const changeGridStyle = getGridStyle(currentGuide!);
      const activeIndex = currentLayoutIndex(currentGuide!);

      setCurrentGrid((prevGrid) => {
        if (prevGrid !== changeGridStyle) {
          setSelectVideos((prevSelect) => {
            const prevSelectVideos = prevSelect.filter((select) => !!select);
            setVideos((prevVideos) => [...prevVideos, ...prevSelectVideos]);
            return [];
          });
          setVideos((prev) => prev.filter((video) => video?.key !== item.id));
        }
        return changeGridStyle;
      });

      setVideos((prevVideos) =>
        prevVideos.filter((video) => video?.key !== item.id)
      );

      setSelectVideos((prevVideos) => {
        const newVideos = [...prevVideos];
        const prevIndexValue = newVideos[activeIndex!];
        if (prevIndexValue) {
          setVideos((prev) => {
            return [...prev, prevIndexValue];
          });
        }
        while (newVideos.length <= activeIndex!) {
          newVideos.push(null); // 빈 값을 채워넣음
        }

        newVideos[activeIndex!] = children.find(
          (child) => child.key === item.id
        )!;
        return newVideos;
      });
    },
  });

  const countSelectVideos = selectVideos.reduce((acc, val) => {
    if (val) return acc + 1;
    else return acc;
  }, 0);

  return (
    <StVideosLayoutContainer>
      <button onClick={handleToggleVideosLayout}>닫기</button>
      <StPreviewContainer $isPreviewVideo={!!videos.length}>
        {videos.map((video) => {
          return (
            <ShareScreenDragItem
              key={video?.key}
              id={video?.key!}
              active={false}
            >
              {video}
            </ShareScreenDragItem>
          );
        })}
      </StPreviewContainer>

      <StLayoutContainer
        ref={(element) => {
          dropParentRef.current = element;
          drop(element);
        }}
        $currentGridLayout={currentGrid!}
        $isPreviewVideo={!!videos.length}
      >
        {!countSelectVideos && (
          <StNoActiveLayoutDiv>
            <span>원하는 레이아웃으로 비디오를 드래그하세요</span>
          </StNoActiveLayoutDiv>
        )}

        {selectVideos?.map((video, index) => {
          if (!video) return <div key={index} />;
          return (
            <ShareScreenDragItem
              key={video.key}
              id={video.key!}
              active={true}
              handleInactive={handleInactive}
            >
              {video}
            </ShareScreenDragItem>
          );
        })}

        {showGuide && <StLayoutGuide $guide={currentGuide} />}
      </StLayoutContainer>
    </StVideosLayoutContainer>
  );
}

const StVideosLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 100px;
  right: 230px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  & > button {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;

const StNoActiveLayoutDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
`;
const StPreviewContainer = styled.div<{ $isPreviewVideo: boolean }>`
  display: flex;
  margin: ${(props) => (props.$isPreviewVideo ? "1rem" : "0")};
  height: ${(props) => (props.$isPreviewVideo ? "15%" : "7%")};
`;

const StLayoutContainer = styled.div<{
  $currentGridLayout: GridStatusType;
  $isPreviewVideo: boolean;
}>`
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  height: ${(props) => (props.$isPreviewVideo ? "85%" : "93%")};
  display: grid;
  position: relative;

  & > span {
    font-size: 4rem;
    color: white;
  }
  ${(props) => {
    switch (props.$currentGridLayout) {
      case "edge-four":
        return "grid-template-rows: 50% 50%; grid-template-columns: 50% 50%";
      case "leftRight-two":
        return "grid-template-rows: 100%; grid-template-columns: 50% 50%";
      case "topBottom-two":
        return "grid-template-rows: 50% 50%; grid-template-columns: 100%";
      case "center-one":
      default:
        return "grid-template-rows: 100%; grid-template-columns: 100%";
    }
  }}
`;

const StLayoutGuide = styled.div<{ $guide: GuideStatusType | null }>`
  z-index: 10;
  background: rgba(122, 108, 108, 0.5);
  position: absolute;
  ${(props) => {
    switch (props.$guide) {
      case "top":
        return "top: 0; bottom: 50%; left: 0; right: 0;";
      case "bottom":
        return "top: 50%; bottom: 0; left: 0; right: 0;";
      case "left":
        return "top: 0; bottom: 0; left: 0; right: 50%;";
      case "right":
        return "top: 0; bottom: 0; left: 50%; right: 0;";
      case "left-top":
        return "top: 0; bottom: 50%; left: 0; right: 50%;";
      case "left-bottom":
        return "top: 50%; bottom: 0; left: 0; right: 50%;";
      case "right-top":
        return "top: 0; bottom: 50%; left: 50%; right: 0;";
      case "right-bottom":
        return "top: 50%; bottom: 0; left: 50%; right: 0;";
      case "center":
        return "top: 0; bottom: 0; left: 0; right: 0;";
      default:
        return "top: unset; bottom: unset; left: unset; right: unset;";
    }
  }}
`;