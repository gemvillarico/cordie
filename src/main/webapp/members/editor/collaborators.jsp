<div id="collaboratorsAndCurrentUsers">
    <div id="collaboratorsAndCurrentUsersBoxTabs">
        <ul>
            <!--<li id="currentusersSubTab">
                <a id="currentusersSubTab2" href="javascript:currentusersSubTab()">Current Users</a>
            </li>-->
            <li id="collaboratorsSubTab">
                <a id="collaboratorsSubTab2" href="javascript:collaboratorsSubTab()">Collaborators</a>
            </li>
            <li id="addCollaboratorSubTab">
                <a id="addCollaboratorSubTab2" href="javascript:addCollaboratorSubTab()">Add Collaborator</a>
            </li>
        </ul>
    </div>

    <div id="collaboratorsAndCurrentUsersTable">
        <!--<div id="currentusersSection" style="display: none;">
            <table border="0" cellspacing="5" cellpadding="0" id="currentusers">
                <thead>
                    <tr>
                        <th colspan="2">Users currently editing this diagram:</th>
                    </tr>
                </thead>
            </table>
        </div>-->
        <div id="collaboratorsSection" style="display: none;">
            <table border="0" cellspacing="0" cellpadding="0" id="collaborators">
                <thead>
                    <tr>
                        <th colspan="2">Collaborators are the users who can edit this diagram.</th>
                    </tr>
                </thead>
            </table>
        </div>
        <table id="addCollaboratorSection" border="0" cellspacing="0" cellpadding="0" style="display: none;">
            <thead>
                <tr>
                    <th colspan="2">You can add a collaborator by entering their username below.</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">
                        <input id="enableAddCollaboratorButton" type="button" value="Add Collaborator"
                   onclick="javascript:enableAddReqCollaborator()" />
                    </td>
                </tr>
                <tr>
                    <td>Username: </td>
                    <td><input id="addCollaboratorText" type="text" value="" size="20" disabled="disabled" /></td>
                </tr>
                <tr>
                    <td>
                        <input id="addCollaboratorButton" type="button" value="Add"
                   disabled="disabled" onclick="javascript:addCollaboratorReq()" />
                    </td>
                    <td>
                        <input id="cancelAddCollaborator" type="button" value="Cancel" disabled="disabled"
                   onclick="javascript:cancelAddCollaborator()" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>