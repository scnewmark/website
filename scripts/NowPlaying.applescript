tell application "Music"
	if player state is playing then
		log name of current track & " - " & artist of current track
	else
        log "N/A"
    end
end tell