import { useUser } from "@clerk/clerk-react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import React, { useEffect, useState } from "react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [channelUrl,setChannelUrl]=useState()

  useEffect(() => {
    if (user) {
      const id = (user.primaryEmailAddress?.emailAddress).split("@")[0];
      setUserId(userId);
    }
  }, [user]);
  return (
    user && (
      <div>
        <div style={{ width: "100%", height: "500px" }}>
          <SendBirdProvider
            appId={import.meta.env.VITE_SENDBIRD_APP_ID}
            userId={userId}
            nickName={user?.fullName}
            profileUrl={user?.imageUrl}
            allowProfileEdit={true}
          >
            {/* channellist */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 h-full">
              <div className="p-5 border shadow-lg">
                <GroupChannelList 
                onChannelSelect={(channel)=>{
                    setChannelUrl(channel?.url)
                }}
                channelListQueryParams={{
                  includeEmpty:true
                }}
                />
              </div>
            </div>

            {/* channelmessagearea */}

            <div className="md:col-span-2 shadow-lg">
              <GroupChannel channelUrl={channelUrl} />
            </div>
          </SendBirdProvider>
        </div>
      </div>
    )
  );
}

export default Inbox;
