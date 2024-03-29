import MetaverseDMListCard from "@/components/metaverse/metaverseChat/dmChat/metaverseDMListCard/MetaverseDMListCard";
import MetaverseDmContainer from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmContainer";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import { Database } from "@/types/supabase.types";
import useChatTypeStore from "@/zustand/chatTypeStore";
import useDmStore from "@/zustand/dmStore";
import useGlobalNavBarStore from "@/zustand/globalNavBarStore";
import {
  StDmContainer,
  StDmListCardWrapper,
} from "@/components/metaverse/styles/metaverseDm.styles";

interface Props {
  dmList:
    | Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"]
    | undefined;
  isOpen: boolean;
}

export default function MetaverseDmList({ dmList, isOpen }: Props) {
  const isOpenChat = useChatTypeStore.use.isOpenChat();
  const closeChat = useChatTypeStore.use.closeChat();
  const isOpenDm = useDmStore.use.isOpen();
  const otherUserName = useDmStore.use.otherUserName();
  const closeDm = useDmStore.use.closeDm();

  const resetAllSections = useGlobalNavBarStore.use.resetAllSections();

  const handleOnClickCloseChat = () => {
    resetAllSections();
    closeDm();
    closeChat();
  };

  const handleCloseDmContainer = () => {
    closeDm();
  };

  return (
    <StDmContainer $isOpen={isOpen}>
      {!isOpenDm ? (
        <MetaverseChatHeader title="DM List" handler={handleOnClickCloseChat} />
      ) : (
        <MetaverseChatHeader
          title="Dm"
          subtitle={otherUserName}
          handler={handleCloseDmContainer}
        />
      )}
      {isOpenChat && !isOpenDm ? (
        <StDmListCardWrapper>
          {dmList?.map((dm) => (
            <MetaverseDMListCard key={dm.message_id} dm={dm} />
          ))}
        </StDmListCardWrapper>
      ) : (
        isOpenChat && <MetaverseDmContainer />
      )}
    </StDmContainer>
  );
}
