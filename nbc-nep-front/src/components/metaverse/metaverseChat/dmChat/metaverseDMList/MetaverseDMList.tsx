import MetaverseDMListCard from "@/components/metaverse/metaverseChat/dmChat/metaverseDMListCard/MetaverseDMListCard";
import MetaverseDmContainer from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmContainer";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setCloseChat } from "@/redux/modules/chatTypeSlice";
import { Database } from "@/supabase/types/supabase";
import useDm from "@/zustand/dmStore";
import useGlobalNavBar from "@/zustand/globalNavBarStore";

interface Props {
  dmList:
    | Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"]
    | undefined;
}

export default function MetaverseDmList({ dmList }: Props) {
  const { isOpenChat } = useAppSelector((state) => state.chatType);
  const { isOpen: isOpenDm, otherUserName, closeDm } = useDm();

  const dispatch = useAppDispatch();
  const { resetAllSections } = useGlobalNavBar();

  const handleOnClickCloseChat = () => {
    resetAllSections();
    closeDm();
    dispatch(setCloseChat());
  };

  const handleCloseDmContainer = () => {
    closeDm();
  };

  return (
    <>
      {!isOpenDm ? (
        <MetaverseChatHeader
          title={"DM List"}
          handler={handleOnClickCloseChat}
        />
      ) : (
        <MetaverseChatHeader
          title={`${otherUserName}`}
          handler={handleCloseDmContainer}
        />
      )}
      {isOpenChat && !isOpenDm ? (
        <div>
          {dmList?.map((dm) => (
            <MetaverseDMListCard key={dm.message_id} dm={dm} />
          ))}
        </div>
      ) : (
        isOpenChat && <MetaverseDmContainer />
      )}
    </>
  );
}
