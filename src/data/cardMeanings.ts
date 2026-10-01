/**
 * Curated Tarot Card Psychological Descriptions & General Meanings
 * Aligned with Tarot as a psychological mirror for self-reflection & decision support.
 */

export interface CardMeaningDetail {
  summary: {
    en: string;
    vi: string;
  };
  upright: {
    en: string;
    vi: string;
  };
  reversed: {
    en: string;
    vi: string;
  };
}

export const CARD_MEANINGS: Record<string, CardMeaningDetail> = {
  "1": {
    "summary": {
      "en": "The archetype of pure potential, fresh beginnings, and courage to step into the unknown without fear.",
      "vi": "Biểu tượng của tiềm năng vô tận, khởi đầu tinh khôi và lòng dũng cảm bước vào hành trình mới không sợ hãi."
    },
    "upright": {
      "en": "Embrace the beginner's mindset. Trust your intuition and take a calculated leap of faith into new possibilities.",
      "vi": "Đón nhận tâm thế người mới bắt đầu. Tin vào trực giác và can đảm dấn thân vào những cơ hội mới mở ra."
    },
    "reversed": {
      "en": "Signals reckless impulses or hesitation rooted in fear. Pause to assess whether you are leaping blindly or holding back needlessly.",
      "vi": "Cảnh báo sự bốc đồng liều lĩnh hoặc do dự do nỗi sợ mơ hồ. Hãy dừng lại để nhìn nhận bạn đang hấp tấp hay quá ngần ngại."
    }
  },
  "2": {
    "summary": {
      "en": "The archetype of focused agency, active manifestation, and aligning your internal will with outer reality.",
      "vi": "Biểu tượng của tính chủ động, năng lực hiện thực hóa và sự đồng điệu giữa ý chí nội tâm với hành động thực tế."
    },
    "upright": {
      "en": "You hold the tools and personal capability required to shape your path. Concentrate your focus and act deliberately.",
      "vi": "Bạn đã có đủ công cụ và năng lực để định hình con đường của mình. Hãy tập trung ý chí và hành động có chủ đích."
    },
    "reversed": {
      "en": "Scattered intentions, self-doubt, or manipulative tendencies. Realign with your authentic integrity and reconnect with your inner skills.",
      "vi": "Ý chí bị phân tán, thiếu tự tin hoặc có xu hướng thao túng. Hãy trở về với sự chân thật và khơi dậy tiềm năng sẵn có."
    }
  },
  "3": {
    "summary": {
      "en": "The guardian of subconscious wisdom, quiet discernment, inner stillness, and intuitive knowing.",
      "vi": "Người canh giữ trí tuệ tiềm thức, trực giác tĩnh lặng và sự thấu suốt sâu sắc từ bên trong."
    },
    "upright": {
      "en": "Listen to the quiet voice within. Trust emotional cues and allow answers to emerge through stillness rather than force.",
      "vi": "Lắng nghe tiếng nói trầm tĩnh của nội tâm. Hãy tin trực giác và để câu trả lời tự nhiên xuất hiện qua sự tĩnh lặng."
    },
    "reversed": {
      "en": "Suppressed intuition, superficial distractions, or ignoring subtle emotional warnings. Step away from external noise to find clarity.",
      "vi": "Trực giác bị đè nén, xao nhãng bởi tiếng ồn bên ngoài hoặc né tránh cảm xúc. Hãy dành không gian tĩnh tâm để tìm lại sáng suốt."
    }
  },
  "4": {
    "summary": {
      "en": "The archetype of fertile creativity, nurturing care, sensual abundance, and organic self-compassion.",
      "vi": "Biểu tượng của sự nuôi dưỡng, sáng tạo trù phú, lòng trắc ẩn và sự hòa hợp dịu dàng với tự nhiên."
    },
    "upright": {
      "en": "Cultivate what nourishes your spirit. Prioritize care, creative expression, and gentleness with yourself and others.",
      "vi": "Nuôi dưỡng những điều đem lại sức sống cho tâm hồn. Hãy chú trọng sự chăm sóc, sáng tạo và lòng dịu dàng với chính mình."
    },
    "reversed": {
      "en": "Creative stagnation, neglecting self-care, or over-giving at the expense of your own emotional reserves. Refill your cup first.",
      "vi": "Bế tắc sáng tạo, bỏ bê việc chăm sóc bản thân hoặc hy sinh kiệt sức. Hãy ưu tiên tái tạo năng lượng cho chính bạn trước."
    }
  },
  "5": {
    "summary": {
      "en": "The archetype of structured clarity, grounded boundaries, rational leadership, and protective stability.",
      "vi": "Biểu tượng của trật tự vững chãi, ranh giới rõ ràng, kỷ luật tự thân và tư duy thiết lập nền tảng ổn định."
    },
    "upright": {
      "en": "Establish healthy boundaries, logical structure, and firm discipline. Step up to direct your circumstances with mature authority.",
      "vi": "Thiết lập ranh giới lành mạnh và kế hoạch rõ ràng. Đứng lên làm chủ hoàn cảnh bằng sự điềm tĩnh và kỷ luật tự giác."
    },
    "reversed": {
      "en": "Rigidity, excessive control, or feeling powerless against external disorder. Balance firmness with flexibility and empathy.",
      "vi": "Sự kiểm soát quá mức, cứng nhắc hoặc cảm giác bất an khi mất kiểm soát. Hãy linh hoạt và lắng nghe thay vì cố áp đặt."
    }
  },
  "6": {
    "summary": {
      "en": "The archetype of shared traditions, ethical frameworks, mentorship, and seeking deeper philosophical meaning.",
      "vi": "Biểu tượng của tri thức nền tảng, hệ giá trị cốt lõi, người dẫn dắt và sự tìm kiếm ý nghĩa đạo đức sâu sắc."
    },
    "upright": {
      "en": "Examine core values, seek wise counsel or established knowledge, and align your choices with lasting principles.",
      "vi": "Nhìn nhận các giá trị cốt lõi, tìm kiếm lời khuyên từ người có kinh nghiệm và neo đậu vào những nguyên tắc bền vững."
    },
    "reversed": {
      "en": "Dogmatic conformity, outdated beliefs, or questioning institutional norms. Forge your personal philosophy with discernment.",
      "vi": "Sự gò bó giáo điều, niềm tin lỗi thời hoặc thôi thúc bứt phá khỏi định kiến cũ để xây dựng hệ giá trị chân thực cho riêng mình."
    }
  },
  "7": {
    "summary": {
      "en": "The archetype of meaningful values alignment, profound relational mirror, and conscious moral choices.",
      "vi": "Biểu tượng của sự gắn kết giá trị, tấm gương phản chiếu qua mối quan hệ và những lựa chọn đạo đức có ý thức."
    },
    "upright": {
      "en": "Harmony between desires and values. Make conscious choices rooted in mutual respect, vulnerability, and authenticity.",
      "vi": "Sự hòa hợp giữa mong muốn và giá trị sống. Hãy đưa ra quyết định dựa trên sự chân thành, thấu hiểu và tôn trọng song phương."
    },
    "reversed": {
      "en": "Internal conflict, misaligned expectations, or avoidance of a difficult decision. Clarify what you truly value above temporary convenience.",
      "vi": "Xung đột nội tâm, rạn nứt vì kỳ vọng lệch pha hoặc trốn tránh một quyết định quan trọng. Hãy làm rõ điều gì thực sự ý nghĩa với bạn."
    }
  },
  "8": {
    "summary": {
      "en": "The archetype of integrated drive, focused willpower, overcoming opposing tensions, and purposeful momentum.",
      "vi": "Biểu tượng của ý chí kiên định, sự hợp nhất các động lực trái chiều và tiến bước với mục tiêu rõ ràng."
    },
    "upright": {
      "en": "Harness dual impulses into unified direction. Maintain disciplined focus and confidence through current challenges.",
      "vi": "Kết hợp các mong muốn trái ngược thành một hướng đi thống nhất. Giữ vững kỷ luật và niềm tin để vượt qua thử thách."
    },
    "reversed": {
      "en": "Loss of direction, aggressive forcefulness, or feeling overwhelmed by obstacles. Slow down and regain control over your inner steering wheel.",
      "vi": "Mất phương hướng, hành động nôn nóng thái quá hoặc bị áp lực cuốn đi. Hãy giảm tốc để lấy lại quyền kiểm soát tâm trí."
    }
  },
  "9": {
    "summary": {
      "en": "The archetype of gentle courage, mastering instinct with compassion, emotional resilience, and quiet endurance.",
      "vi": "Biểu tượng của sự dũng cảm dịu dàng, chế ngự bản năng bằng lòng trắc ẩn và sự kiên nhẫn nội tâm bền bỉ."
    },
    "upright": {
      "en": "True power comes from gentle persistence and self-acceptance, not brute force. Tame inner anxieties with patient empathy.",
      "vi": "Sức mạnh đích thực đến từ sự kiên nhẫn và thấu hiểu bản thân, không phải bạo lực. Hãy đối thoại dịu dàng với nỗi sợ của mình."
    },
    "reversed": {
      "en": "Depleted emotional reserves, self-criticism, or letting raw fear overpower reason. Reassure yourself and cultivate gentle self-compassion.",
      "vi": "Cạn kiệt năng lượng tinh thần, tự chỉ trích bản thân hoặc để nỗi sợ lấn át. Hãy dừng lại để chăm sóc và động viên chính mình."
    }
  },
  "10": {
    "summary": {
      "en": "The archetype of introspective solitude, seeking inner truth, stepping back from noise to find internal illumination.",
      "vi": "Biểu tượng của sự chiêm nghiệm tĩnh lặng, tìm kiếm sự thật nội tâm và lùi lại để thấu suốt bản thân."
    },
    "upright": {
      "en": "A period of solitary reflection brings essential wisdom. Look inward to illuminate the next step rather than seeking validation outside.",
      "vi": "Khoảng lặng để nhìn lại chính mình mang đến tuệ giác cần thiết. Hãy lắng nghe ngọn đèn dẫn lối từ bên trong bạn."
    },
    "reversed": {
      "en": "Isolating into rumination, loneliness, or stubbornly shutting others out. Distinguish between fruitful reflection and unhealthy withdrawal.",
      "vi": "Sự cô lập tiêu cực, tự giam mình trong suy nghĩ quẩn quanh hoặc khép kín quá mức. Hãy mở lòng kết nối lại khi cần thiết."
    }
  },
  "11": {
    "summary": {
      "en": "The archetype of cyclical change, impermanence, recognizing systemic shifts, and finding stability at the center of life's rotation.",
      "vi": "Biểu tượng của quy luật tuần hoàn, tính vô thường và khả năng giữ vững tâm thế bình thản giữa những thăng trầm cuộc sống."
    },
    "upright": {
      "en": "Life is shifting. Adapt with flexibility and grace, focusing on what is within your control while releasing fixation on the inevitable cycles.",
      "vi": "Thời thế và hoàn cảnh đang chuyển động. Hãy linh hoạt thích ứng, tập trung vào việc bạn kiểm soát được và chấp nhận sự đổi thay."
    },
    "reversed": {
      "en": "Resisting natural transitions, feeling victimized by bad timing, or clinging to the past. Accept the cycle to regain your footing.",
      "vi": "Kháng cự sự thay đổi, cảm giác bất lực trước hoàn cảnh hoặc bám víu điều đã qua. Hãy buông tay để tìm lại sự chủ động mới."
    }
  },
  "12": {
    "summary": {
      "en": "The archetype of honest accountability, clarity of truth, cause and effect, and rational equilibrium.",
      "vi": "Biểu tượng của sự công bằng, minh bạch, luật nhân quả và cái nhìn khách quan không thiên vị."
    },
    "upright": {
      "en": "Examine facts dispassionately. Own your choices and seek fair, balanced outcomes built on honesty and integrity.",
      "vi": "Nhìn nhận sự việc bằng con mắt khách quan. Chịu trách nhiệm với các quyết định của mình và hướng đến sự công bằng, minh bạch."
    },
    "reversed": {
      "en": "Cognitive bias, avoiding accountability, or enduring unfair treatment. Strive for internal fairness and honest acknowledgment of truth.",
      "vi": "Định kiến thiên vị, trốn tránh trách nhiệm hoặc cảm thấy bất công. Hãy trung thực với chính mình trước khi phán xét ngoại cảnh."
    }
  },
  "13": {
    "summary": {
      "en": "The archetype of fruitful pause, voluntary surrender, shifting perspective, and yielding ego control for greater insight.",
      "vi": "Biểu tượng của khoảng lặng tự nguyện, buông bỏ sự kiểm soát của cái tôi và nhìn nhận sự việc dưới góc nhìn hoàn toàn mới."
    },
    "upright": {
      "en": "Suspend urgency. By surrendering the struggle and looking at the situation upside down, profound new insights reveal themselves.",
      "vi": "Tạm dừng sự vội vã. Khi bạn chấp nhận buông lỏng và nhìn sự việc từ góc độ khác, giải pháp bất ngờ sẽ tự hiển lộ."
    },
    "reversed": {
      "en": "Pointless sacrifice, stubborn stagnation, or resisting a necessary pause. Ask whether your delay is wisdom or avoidance.",
      "vi": "Hy sinh vô ích, trì trệ kéo dài hoặc chống cự việc buông bỏ. Hãy phân biệt giữa sự chờ đợi chín muồi và việc trốn tránh hành động."
    }
  },
  "14": {
    "summary": {
      "en": "The archetype of profound transformation, natural endings making room for new growth, and shedding outlived identities.",
      "vi": "Biểu tượng của sự chuyển hóa sâu sắc, kết thúc một chu kỳ để mở đường cho sự tái sinh và lột xác."
    },
    "upright": {
      "en": "Allow what has expired to fall away peacefully. True renewal begins only after you release the old forms and attachments.",
      "vi": "Hãy để những điều đã hết vai trò ra đi thanh thản. Một chương mới chỉ có thể bắt đầu khi bạn can đảm khép lại trang cũ."
    },
    "reversed": {
      "en": "Clinging desperately to expired patterns, fear of grief, or resisting closure. Gently acknowledge that holding on causes more pain than letting go.",
      "vi": "Cố chấp níu kéo điều đã qua, sợ hãi đổi thay hoặc né tránh sự mất mát. Giữ chặt những điều đã cũ chỉ làm bạn kiệt sức."
    }
  },
  "15": {
    "summary": {
      "en": "The archetype of harmonious integration, emotional equilibrium, patience, and synthesizing opposites into a peaceful whole.",
      "vi": "Biểu tượng của sự điều độ, dung hòa các mặt đối lập, tính kiên nhẫn và sự cân bằng nội tâm tĩnh tại."
    },
    "upright": {
      "en": "Seek the middle path. Blend different aspects of your life with patience, moderation, and calm emotional regulation.",
      "vi": "Chọn con đường trung đạo. Hãy hòa phối các yếu tố trái ngược bằng sự kiên nhẫn, điềm tĩnh và chừng mực trong hành xử."
    },
    "reversed": {
      "en": "Extremes, impatience, emotional turbulence, or internal discord. Bring yourself back into alignment through rest and mindful pacing.",
      "vi": "Sự thái quá, thiếu kiên nhẫn hoặc xáo trộn cảm xúc. Hãy điều hòa lại nhịp sống và tránh phản ứng nóng vội lúc này."
    }
  },
  "16": {
    "summary": {
      "en": "The archetype of shadow projections, self-limiting attachments, unconscious compulsions, and illusion of helplessness.",
      "vi": "Biểu tượng của bóng tối tâm lý (shadow), sự ràng buộc tự tạo, thói quen độc hại và ảo tưởng bị cầm tù."
    },
    "upright": {
      "en": "Examine unhealthy patterns or dependencies. The chains are often looser than you think—awareness is your gateway to liberation.",
      "vi": "Nhìn thẳng vào những thói quen gây hại hoặc sự lệ thuộc vô thức. Nhận thức rõ ràng là chìa khóa đầu tiên để bạn tự giải thoát mình."
    },
    "reversed": {
      "en": "Breaking free from toxic patterns, waking up from illusions, and reclaiming personal sovereignty with courage.",
      "vi": "Bước đầu thoát khỏi sự trói buộc, thức tỉnh trước ảo vọng và từng bước lấy lại quyền tự quyết cho cuộc sống của bạn."
    }
  },
  "17": {
    "summary": {
      "en": "The archetype of sudden awakening, collapse of brittle illusions, and catalytic truth dismantling false security.",
      "vi": "Biểu tượng của sự thức tỉnh đột ngột, sụp đổ các ảo tưởng sai lầm và sự giải phóng cần thiết để xây dựng lại chân thực hơn."
    },
    "upright": {
      "en": "A sudden realization shatters rigid assumptions. Though destabilizing, it clears away falsehood so you can build on authentic ground.",
      "vi": "Một biến cố hoặc nhận thức bất ngờ đập tan những điều giả tạo. Dù bỡ ngỡ ban đầu, nền tảng mới sẽ chân thực và vững chắc hơn."
    },
    "reversed": {
      "en": "Averting total disaster, internal crisis of belief, or clinging to a collapsing structure out of terror. Accept reality to rebuild safely.",
      "vi": "Cố gắng né tránh sự thật hiển nhiên, khủng hoảng niềm tin ngấm ngầm. Đừng cố vá víu những điều đã mục ruỗng."
    }
  },
  "18": {
    "summary": {
      "en": "The archetype of serene hope, spiritual renewal, renewed faith, and clarity following profound turbulence.",
      "vi": "Biểu tượng của niềm hy vọng sáng trong, sự phục hồi tinh thần, niềm tin tái sinh và nguồn cảm hứng thanh khiết."
    },
    "upright": {
      "en": "Healing and renewal are flowing into your life. Have faith in your future and share your authentic light with genuine vulnerability.",
      "vi": "Nguồn năng lượng chữa lành và hy vọng đang trở lại. Hãy nuôi dưỡng niềm tin và giữ tâm thế rộng mở đón nhận tương lai."
    },
    "reversed": {
      "en": "Discouragement, cynicism, or difficulty sensing hope amidst fatigue. Nurture small embers of trust without expecting instant perfection.",
      "vi": "Cảm giác tuyệt vọng, mất niềm tin tạm thời hoặc kiệt sức. Hãy chăm chút từng niềm vui nhỏ bé để nhen nhóm lại ánh sáng."
    }
  },
  "19": {
    "summary": {
      "en": "The archetype of the unconscious realm, ambiguous emotional depths, illusions, and navigating through foggy uncertainty.",
      "vi": "Biểu tượng của tiềm thức sâu kín, những ảo ảnh mơ hồ, nỗi sợ vô hình và hành trình đi qua sương mù chưa rõ ràng."
    },
    "upright": {
      "en": "Things may not be as they seem on the surface. Don't rush major conclusions; pay attention to dreams and unspoken psychological undertones.",
      "vi": "Mọi việc chưa hoàn toàn rõ ràng như vẻ ngoài. Đừng vội kết luận; hãy chú ý đến những cảm giác trực giác và nỗi sợ thầm kín."
    },
    "reversed": {
      "en": "Dispelling confusion, recognizing unfounded anxieties, or uncovering hidden truths that liberate your mind from paranoia.",
      "vi": "Màn sương mù tan dần, nhận ra những âu lo là do tưởng tượng và tìm lại sự tỉnh táo, rành mạch."
    }
  },
  "20": {
    "summary": {
      "en": "The archetype of radiant clarity, vital joy, warmth, conscious awareness, and celebrating wholesome vitality.",
      "vi": "Biểu tượng của sự rõ ràng rực rỡ, niềm hân hoan thuần khiết, sức sống dồi dào và sự tự tin tỏa sáng."
    },
    "upright": {
      "en": "Clarity, enthusiasm, and vitality abound. Step into the light with joyful self-expression and gratitude for present blessings.",
      "vi": "Mọi sự sáng tỏ, tràn ngập năng lượng tích cực và sự ấm áp. Hãy tự tin thể hiện chính mình với tinh thần lạc quan rộng mở."
    },
    "reversed": {
      "en": "Clouded optimism, struggling to access joy, or temporary burn-out. The warmth is still there—give yourself permission to rest and unburden.",
      "vi": "Niềm vui bị che khuất tạm thời, mệt mỏi hoặc suy nghĩ bi quan. Mặt trời vẫn ở đó, hãy cho phép bản thân nghỉ ngơi để hồi phục."
    }
  },
  "21": {
    "summary": {
      "en": "The archetype of self-reckoning, answering a higher calling, profound forgiveness, and awakening to your authentic life path.",
      "vi": "Biểu tượng của sự phản tỉnh sâu sắc, tiếng gọi thức tỉnh, sự tha thứ và bước lên một tầng bậc nhận thức mới."
    },
    "upright": {
      "en": "Time to evaluate your journey with compassionate clarity. Release past regrets, heed your inner calling, and step forward unburdened.",
      "vi": "Thời khắc nhìn nhận lại hành trình với sự bao dung. Hãy tha thứ cho quá khứ, lắng nghe tiếng gọi nội tâm và bước tiếp nhẹ nhõm."
    },
    "reversed": {
      "en": "Harsh self-condemnation, ignoring persistent wake-up calls, or paralysis by past mistakes. Practice self-mercy and decide to begin anew.",
      "vi": "Tự phán xét cay nghiệt, phớt lờ bài học cuộc sống hoặc sợ hãi thay đổi. Hãy bao dung với chính mình và can đảm làm lại."
    }
  },
  "22": {
    "summary": {
      "en": "The archetype of holistic completion, integration of lessons, cosmic wholeness, and triumphant transition into a new cycle.",
      "vi": "Biểu tượng của sự viên mãn trọn vẹn, tích hợp mọi bài học, cảm giác đủ đầy và hoàn tất một chu kỳ lớn để chuẩn bị bước sang trang mới."
    },
    "upright": {
      "en": "Celebrate accomplishment and completion. You have integrated valuable life lessons; honor how far you have grown and embrace wholeness.",
      "vi": "Chúc mừng sự hoàn tất và thành tựu đã đạt được. Bạn đã tích lũy đủ bài học giá trị; hãy tự hào về hành trình trưởng thành của mình."
    },
    "reversed": {
      "en": "Lingering loose ends, seeking external validation for closure, or hesitation at the threshold of the next chapter. Tie up the final details.",
      "vi": "Còn chút vướng mắc chưa dứt, thiếu cảm giác trọn vẹn hoặc ngần ngại trước ngưỡng cửa mới. Hãy hoàn thành nốt những điều còn dang dở."
    }
  },
  "23": {
    "summary": {
      "en": "Ace of Wands: The raw seed of new potential, initial inspiration, and pure elemental breakthrough. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Át Gậy: Hạt mầm sơ khởi của tiềm năng mới, nguồn cảm hứng ban đầu và sự khởi phát thuần khiết. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "A pristine opportunity presents itself. Grasp this seed of potential and begin channelizing it into constructive reality. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Một cơ hội tinh khôi xuất hiện. Hãy nắm lấy hạt mầm tiềm năng này và nuôi dưỡng nó thành hiện thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Hesitation, ungrounded ideas, or missed beginnings. Ground your vision before momentum dissipates. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Do dự, ý tưởng chưa có nền tảng hoặc lỡ nhịp khởi đầu. Hãy định hình lại mục tiêu trước khi nhiệt huyết phai nhạt. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "24": {
    "summary": {
      "en": "Two of Wands: Duality, early balance, decision-making, and evaluating options. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Hai Gậy: Sự phân vân, cân nhắc lựa chọn, thiết lập thế cân bằng ban đầu. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Weigh your choices with mindfulness. Find equilibrium between two forces and plan your next steps deliberately. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Cân nhắc kỹ lưỡng các phương án. Tìm thế cân bằng và lên kế hoạch cho bước đi tiếp theo một cách điềm tĩnh. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Imbalance, indecision, or inner tension between competing demands. Make a clear choice to move forward. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Mất cân bằng, do dự không dứt hoặc giằng xé giữa hai ngả đường. Cần dứt khoát đưa ra quyết định. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "25": {
    "summary": {
      "en": "Three of Wands: Initial fruit, collaboration, expansion, and visible early progress. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Ba Gậy: Thành quả đầu tiên, sự mở rộng, kết nối hợp tác và tiến triển cụ thể. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Your initial efforts are bearing fruit. Look outward, collaborate, and expand your horizons with confidence. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Những nỗ lực ban đầu đã đơm hoa kết trái. Hãy mở rộng tầm nhìn, kết nối hợp tác và tự tin tiến xa hơn. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Delays, creative friction, or dashed expectations. Regroup, refine your methods, and communicate clearly. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Chậm tiến độ, bất đồng trong hợp tác hoặc kỳ vọng chưa đạt. Hãy điều chỉnh phương pháp và trao đổi cởi mở hơn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "26": {
    "summary": {
      "en": "Four of Wands: Stability, structure, consolidation, and protecting established foundations. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Bốn Gậy: Sự ổn định, củng cố nền tảng, thiết lập trật tự và bảo vệ thành quả. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Consolidate your position. Appreciate current stability and build secure structures that provide emotional or material grounding. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Củng cố vị thế hiện tại. Trân trọng sự bình ổn và xây dựng nền tảng an toàn cho chặng đường dài. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Stagnation, rigidity, or fear of stepping beyond comfort zones. Open up to necessary healthy change. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Trì trệ, bám víu vùng an toàn hoặc sự cứng nhắc quá mức. Hãy sẵn sàng đón nhận những luồng gió mới. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "27": {
    "summary": {
      "en": "Five of Wands: Challenge, tension, conflict, testing of limits, and constructive growth through friction. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Năm Gậy: Thử thách, xung đột, sự xáo trộn thử thách bản lĩnh để trưởng thành. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Friction reveals where adjustments are needed. Treat conflict as feedback rather than defeat, and seek constructive resolution. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Va chạm giúp nhận ra điều cần chỉnh sửa. Hãy xem mâu thuẫn như phản hồi để hoàn thiện hơn, thay vì buông xuôi. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Easing of tensions, recovery from setback, or exhausting inner turmoil. Choose peace over stubborn battles. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Căng thẳng dần lắng xuống, phục hồi sau va vấp. Hãy buông bỏ những tranh cãi vô bổ để lấy lại bình yên. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "28": {
    "summary": {
      "en": "Six of Wands: Harmony regained, reciprocity, transit to calmer waters, and mutual support. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Sáu Gậy: Lấy lại cân bằng, sự chia sẻ tương hỗ, chuyển tiếp sang vùng nước êm đềm. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Balance and grace return. Enjoy mutual cooperation, sharing of resources, and gentle forward movement. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Sự thanh thản và hòa hợp trở lại. Hãy đón nhận sự hỗ trợ lẫn nhau và tiếp tục tiến bước trong bình an. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Reluctance to move on, unresolved past attachments, or one-sided dynamics. Focus on forward healing. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Khó khăn trong việc buông bỏ quá khứ, tương tác một chiều. Hãy hướng về phía trước để chữa lành triệt để. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "29": {
    "summary": {
      "en": "Seven of Wands: Assessment, perseverance, strategic reflection, and facing inner dilemmas. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Bảy Gậy: Đánh giá lại quá trình, sự kiên trì, suy ngẫm chiến lược và đối diện băn khoăn nội tâm. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Stand firm in your convictions while assessing long-term value. Patience and strategic honesty serve you best. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Giữ vững lập trường và đánh giá lại giá trị lâu dài. Sự kiên nhẫn và tính toán tỉnh táo là điều bạn cần lúc này. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Impatient rushing, exhaustion, or second-guessing choices. Take a breath and realign with genuine priorities. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Hấp tấp sốt ruột, kiệt sức hoặc hoài nghi bản thân. Hãy hít thở sâu và xác định lại điều gì thực sự cốt lõi. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "30": {
    "summary": {
      "en": "Eight of Wands: Mastery, dedication, accelerated movement, or deliberate transition. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Tám Gậy: Sự tập trung rèn luyện, nhịp độ dồn dập hoặc chuyển bước dứt khoát. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Channel focus into your craft or path. Dedicated practice and decisive momentum bring notable breakthroughs. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Dồn hết tâm trí vào công việc hoặc hành trình. Sự rèn luyện tận tâm và nhịp bước dứt khoát sẽ tạo bước đột phá. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Burnout, scattered speed without purpose, or resisting necessary departure. Slow down to restore intentionality. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Kiệt sức, hành động vội vã mất phương hướng hoặc chần chừ rời bỏ điều không còn phù hợp. Cần chậm lại. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "31": {
    "summary": {
      "en": "Nine of Wands: Culmination, self-reliance, resilience, and approaching completion. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Chín Gậy: Đỉnh cao tích lũy, sự tự chủ kiên cường, cận kề đích đến. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Draw upon your proven resilience and inner strength. You are nearly at your goal; guard your peace and stand tall. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Phát huy sức mạnh nội tại và sự kiên cường đã được trui rèn. Đích đến đã rất gần; hãy giữ vững niềm tin. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Defensiveness, paranoia, or fatigue near the finish line. Allow yourself to rest without giving up your gains. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Phòng thủ thái quá, kiệt sức ngay trước vạch đích. Cho phép mình nghỉ ngơi mà không làm mất đi thành quả. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "32": {
    "summary": {
      "en": "Ten of Wands: Full cycle completion, culmination of consequences, and transitioning to a fresh era. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Mười Gậy: Hoàn tất chu kỳ, kết quả trọn vẹn của cả một hành trình và chuẩn bị bước sang trang mới. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "A cycle reaches its fullness. Honor the complete outcome—whether a bountiful fulfillment or the release of a heavy load. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Chu kỳ đã chạm tới đỉnh điểm trọn vẹn. Hãy ghi nhận kết quả và sẵn sàng đón nhận chu kỳ tiếp theo. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Overburdened exhaustion, denying closure, or dragging past baggage. Put down the burden and allow the end to be the end. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Quá tải gánh nặng, trốn tránh kết thúc hoặc ôm đồm quá mức. Hãy đặt gánh nặng xuống để giải phóng chính mình. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "33": {
    "summary": {
      "en": "Page of Wands: Curious exploration, student archetype, youthful enthusiasm, and fresh messages. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Tiểu Đồng Gậy: Tính tò mò khám phá, tâm thế người học hỏi, nhiệt huyết trẻ trung và tin tức mới mẻ. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Approach your path with open curiosity and eagerness to learn. Welcome new inspirations with a beginner's enthusiasm. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Hãy tiếp cận mọi việc bằng sự tò mò trong sáng và tinh thần cầu thị. Đón nhận cảm hứng mới với lòng nhiệt thành. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Petty drama, lack of follow-through, or immature distraction. Focus your curiosity into disciplined learning. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Nông nổi, thiếu kiên định hoặc bị xao nhãng bởi những chuyện vụn vặt. Hãy biến tò mò thành kỷ luật học tập. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "34": {
    "summary": {
      "en": "Knight of Wands: Dynamic pursuit, questing energy, passionate momentum, and active dedication. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Hiệp Sĩ Gậy: Hành động quyết liệt, năng lượng xông xáo, dấn thân vì mục tiêu. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Pursue your quest with courage, vigor, and dedicated drive. Channel passionate energy into purposeful action. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Tiến lên với lòng dũng cảm, tinh thần quyết đoán và năng lượng dồi dào. Biến nhiệt huyết thành hành động thiết thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Recklessness, erratic impulsiveness, or running hot and cold. Ground your fiery drive with strategic patience. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Hấp tấp nóng vội, bốc đồng mất kiểm soát hoặc dễ nản chí. Cần ghìm cương cảm xúc bằng sự kiên nhẫn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "35": {
    "summary": {
      "en": "Queen of Wands: Mature emotional wisdom, self-possession, nurturing mastery, and inward authority. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Hoàng Hậu Gậy: Sự thấu suốt chín chắn, tự tin làm chủ cảm xúc, nuôi dưỡng bằng sự tinh tế và ấm áp. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Embody grounded grace, self-confidence, and intuitive stewardship. Lead from a center of quiet wisdom and emotional poise. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Tỏa ra phong thái tự tin, điềm đạm và thấu cảm. Dẫn dắt mọi việc bằng sự ấm áp và chiều sâu nội tâm. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Emotional withdrawal, insecurity, or martyrdom. Reconnect with self-love and establish clear internal sovereignty. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Khép kín cảm xúc, bất an thiếu tự tin hoặc cảm giác hy sinh vô ích. Hãy trở về chăm sóc lòng tự trắc ẩn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "36": {
    "summary": {
      "en": "King of Wands: External mastery, mature leadership, ethical oversight, and commanding expertise. Governed by Fire (Creativity, passion, vitality, ambition, and will).",
      "vi": "Vua Gậy: Bản lĩnh làm chủ, tầm nhìn lãnh đạo trưởng thành, sự thông thái và trách nhiệm vững vàng. Thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "upright": {
      "en": "Exercise calm command and mature stewardship. Guide your situation with fairness, experience, and grounded vision. Focus this energy into fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Thể hiện bản lĩnh làm chủ và sự từng trải. Dẫn dắt tình huống bằng sự công tâm, tỉnh táo và tầm nhìn xa. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    },
    "reversed": {
      "en": "Autocratic rigidity, aloof detachment, or misuse of authority. Soften your approach with empathy and humility. Watch for blocked or excessive expression in matters of fire (creativity, passion, vitality, ambition, and will).",
      "vi": "Độc đoán cứng nhắc, xa cách lạnh lùng hoặc lạm quyền. Hãy lắng nghe nhiều hơn với sự khiêm tốn và thấu cảm. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)."
    }
  },
  "37": {
    "summary": {
      "en": "Ace of Cups: The raw seed of new potential, initial inspiration, and pure elemental breakthrough. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Át Ly: Hạt mầm sơ khởi của tiềm năng mới, nguồn cảm hứng ban đầu và sự khởi phát thuần khiết. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "A pristine opportunity presents itself. Grasp this seed of potential and begin channelizing it into constructive reality. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Một cơ hội tinh khôi xuất hiện. Hãy nắm lấy hạt mầm tiềm năng này và nuôi dưỡng nó thành hiện thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Hesitation, ungrounded ideas, or missed beginnings. Ground your vision before momentum dissipates. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Do dự, ý tưởng chưa có nền tảng hoặc lỡ nhịp khởi đầu. Hãy định hình lại mục tiêu trước khi nhiệt huyết phai nhạt. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "38": {
    "summary": {
      "en": "Two of Cups: Duality, early balance, decision-making, and evaluating options. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Hai Ly: Sự phân vân, cân nhắc lựa chọn, thiết lập thế cân bằng ban đầu. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Weigh your choices with mindfulness. Find equilibrium between two forces and plan your next steps deliberately. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Cân nhắc kỹ lưỡng các phương án. Tìm thế cân bằng và lên kế hoạch cho bước đi tiếp theo một cách điềm tĩnh. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Imbalance, indecision, or inner tension between competing demands. Make a clear choice to move forward. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Mất cân bằng, do dự không dứt hoặc giằng xé giữa hai ngả đường. Cần dứt khoát đưa ra quyết định. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "39": {
    "summary": {
      "en": "Three of Cups: Initial fruit, collaboration, expansion, and visible early progress. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Ba Ly: Thành quả đầu tiên, sự mở rộng, kết nối hợp tác và tiến triển cụ thể. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Your initial efforts are bearing fruit. Look outward, collaborate, and expand your horizons with confidence. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Những nỗ lực ban đầu đã đơm hoa kết trái. Hãy mở rộng tầm nhìn, kết nối hợp tác và tự tin tiến xa hơn. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Delays, creative friction, or dashed expectations. Regroup, refine your methods, and communicate clearly. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Chậm tiến độ, bất đồng trong hợp tác hoặc kỳ vọng chưa đạt. Hãy điều chỉnh phương pháp và trao đổi cởi mở hơn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "40": {
    "summary": {
      "en": "Four of Cups: Stability, structure, consolidation, and protecting established foundations. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Bốn Ly: Sự ổn định, củng cố nền tảng, thiết lập trật tự và bảo vệ thành quả. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Consolidate your position. Appreciate current stability and build secure structures that provide emotional or material grounding. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Củng cố vị thế hiện tại. Trân trọng sự bình ổn và xây dựng nền tảng an toàn cho chặng đường dài. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Stagnation, rigidity, or fear of stepping beyond comfort zones. Open up to necessary healthy change. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Trì trệ, bám víu vùng an toàn hoặc sự cứng nhắc quá mức. Hãy sẵn sàng đón nhận những luồng gió mới. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "41": {
    "summary": {
      "en": "Five of Cups: Challenge, tension, conflict, testing of limits, and constructive growth through friction. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Năm Ly: Thử thách, xung đột, sự xáo trộn thử thách bản lĩnh để trưởng thành. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Friction reveals where adjustments are needed. Treat conflict as feedback rather than defeat, and seek constructive resolution. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Va chạm giúp nhận ra điều cần chỉnh sửa. Hãy xem mâu thuẫn như phản hồi để hoàn thiện hơn, thay vì buông xuôi. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Easing of tensions, recovery from setback, or exhausting inner turmoil. Choose peace over stubborn battles. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Căng thẳng dần lắng xuống, phục hồi sau va vấp. Hãy buông bỏ những tranh cãi vô bổ để lấy lại bình yên. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "42": {
    "summary": {
      "en": "Six of Cups: Harmony regained, reciprocity, transit to calmer waters, and mutual support. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Sáu Ly: Lấy lại cân bằng, sự chia sẻ tương hỗ, chuyển tiếp sang vùng nước êm đềm. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Balance and grace return. Enjoy mutual cooperation, sharing of resources, and gentle forward movement. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Sự thanh thản và hòa hợp trở lại. Hãy đón nhận sự hỗ trợ lẫn nhau và tiếp tục tiến bước trong bình an. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Reluctance to move on, unresolved past attachments, or one-sided dynamics. Focus on forward healing. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Khó khăn trong việc buông bỏ quá khứ, tương tác một chiều. Hãy hướng về phía trước để chữa lành triệt để. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "43": {
    "summary": {
      "en": "Seven of Cups: Assessment, perseverance, strategic reflection, and facing inner dilemmas. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Bảy Ly: Đánh giá lại quá trình, sự kiên trì, suy ngẫm chiến lược và đối diện băn khoăn nội tâm. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Stand firm in your convictions while assessing long-term value. Patience and strategic honesty serve you best. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Giữ vững lập trường và đánh giá lại giá trị lâu dài. Sự kiên nhẫn và tính toán tỉnh táo là điều bạn cần lúc này. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Impatient rushing, exhaustion, or second-guessing choices. Take a breath and realign with genuine priorities. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Hấp tấp sốt ruột, kiệt sức hoặc hoài nghi bản thân. Hãy hít thở sâu và xác định lại điều gì thực sự cốt lõi. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "44": {
    "summary": {
      "en": "Eight of Cups: Mastery, dedication, accelerated movement, or deliberate transition. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Tám Ly: Sự tập trung rèn luyện, nhịp độ dồn dập hoặc chuyển bước dứt khoát. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Channel focus into your craft or path. Dedicated practice and decisive momentum bring notable breakthroughs. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Dồn hết tâm trí vào công việc hoặc hành trình. Sự rèn luyện tận tâm và nhịp bước dứt khoát sẽ tạo bước đột phá. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Burnout, scattered speed without purpose, or resisting necessary departure. Slow down to restore intentionality. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Kiệt sức, hành động vội vã mất phương hướng hoặc chần chừ rời bỏ điều không còn phù hợp. Cần chậm lại. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "45": {
    "summary": {
      "en": "Nine of Cups: Culmination, self-reliance, resilience, and approaching completion. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Chín Ly: Đỉnh cao tích lũy, sự tự chủ kiên cường, cận kề đích đến. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Draw upon your proven resilience and inner strength. You are nearly at your goal; guard your peace and stand tall. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Phát huy sức mạnh nội tại và sự kiên cường đã được trui rèn. Đích đến đã rất gần; hãy giữ vững niềm tin. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Defensiveness, paranoia, or fatigue near the finish line. Allow yourself to rest without giving up your gains. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Phòng thủ thái quá, kiệt sức ngay trước vạch đích. Cho phép mình nghỉ ngơi mà không làm mất đi thành quả. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "46": {
    "summary": {
      "en": "Ten of Cups: Full cycle completion, culmination of consequences, and transitioning to a fresh era. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Mười Ly: Hoàn tất chu kỳ, kết quả trọn vẹn của cả một hành trình và chuẩn bị bước sang trang mới. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "A cycle reaches its fullness. Honor the complete outcome—whether a bountiful fulfillment or the release of a heavy load. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Chu kỳ đã chạm tới đỉnh điểm trọn vẹn. Hãy ghi nhận kết quả và sẵn sàng đón nhận chu kỳ tiếp theo. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Overburdened exhaustion, denying closure, or dragging past baggage. Put down the burden and allow the end to be the end. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Quá tải gánh nặng, trốn tránh kết thúc hoặc ôm đồm quá mức. Hãy đặt gánh nặng xuống để giải phóng chính mình. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "47": {
    "summary": {
      "en": "Page of Cups: Curious exploration, student archetype, youthful enthusiasm, and fresh messages. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Tiểu Đồng Ly: Tính tò mò khám phá, tâm thế người học hỏi, nhiệt huyết trẻ trung và tin tức mới mẻ. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Approach your path with open curiosity and eagerness to learn. Welcome new inspirations with a beginner's enthusiasm. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Hãy tiếp cận mọi việc bằng sự tò mò trong sáng và tinh thần cầu thị. Đón nhận cảm hứng mới với lòng nhiệt thành. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Petty drama, lack of follow-through, or immature distraction. Focus your curiosity into disciplined learning. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Nông nổi, thiếu kiên định hoặc bị xao nhãng bởi những chuyện vụn vặt. Hãy biến tò mò thành kỷ luật học tập. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "48": {
    "summary": {
      "en": "Knight of Cups: Dynamic pursuit, questing energy, passionate momentum, and active dedication. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Hiệp Sĩ Ly: Hành động quyết liệt, năng lượng xông xáo, dấn thân vì mục tiêu. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Pursue your quest with courage, vigor, and dedicated drive. Channel passionate energy into purposeful action. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Tiến lên với lòng dũng cảm, tinh thần quyết đoán và năng lượng dồi dào. Biến nhiệt huyết thành hành động thiết thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Recklessness, erratic impulsiveness, or running hot and cold. Ground your fiery drive with strategic patience. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Hấp tấp nóng vội, bốc đồng mất kiểm soát hoặc dễ nản chí. Cần ghìm cương cảm xúc bằng sự kiên nhẫn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "49": {
    "summary": {
      "en": "Queen of Cups: Mature emotional wisdom, self-possession, nurturing mastery, and inward authority. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Hoàng Hậu Ly: Sự thấu suốt chín chắn, tự tin làm chủ cảm xúc, nuôi dưỡng bằng sự tinh tế và ấm áp. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Embody grounded grace, self-confidence, and intuitive stewardship. Lead from a center of quiet wisdom and emotional poise. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Tỏa ra phong thái tự tin, điềm đạm và thấu cảm. Dẫn dắt mọi việc bằng sự ấm áp và chiều sâu nội tâm. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Emotional withdrawal, insecurity, or martyrdom. Reconnect with self-love and establish clear internal sovereignty. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Khép kín cảm xúc, bất an thiếu tự tin hoặc cảm giác hy sinh vô ích. Hãy trở về chăm sóc lòng tự trắc ẩn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "50": {
    "summary": {
      "en": "King of Cups: External mastery, mature leadership, ethical oversight, and commanding expertise. Governed by Water (Emotions, relationships, intuition, empathy, and love).",
      "vi": "Vua Ly: Bản lĩnh làm chủ, tầm nhìn lãnh đạo trưởng thành, sự thông thái và trách nhiệm vững vàng. Thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "upright": {
      "en": "Exercise calm command and mature stewardship. Guide your situation with fairness, experience, and grounded vision. Focus this energy into water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Thể hiện bản lĩnh làm chủ và sự từng trải. Dẫn dắt tình huống bằng sự công tâm, tỉnh táo và tầm nhìn xa. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    },
    "reversed": {
      "en": "Autocratic rigidity, aloof detachment, or misuse of authority. Soften your approach with empathy and humility. Watch for blocked or excessive expression in matters of water (emotions, relationships, intuition, empathy, and love).",
      "vi": "Độc đoán cứng nhắc, xa cách lạnh lùng hoặc lạm quyền. Hãy lắng nghe nhiều hơn với sự khiêm tốn và thấu cảm. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)."
    }
  },
  "51": {
    "summary": {
      "en": "Ace of Swords: The raw seed of new potential, initial inspiration, and pure elemental breakthrough. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Át Kiếm: Hạt mầm sơ khởi của tiềm năng mới, nguồn cảm hứng ban đầu và sự khởi phát thuần khiết. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "A pristine opportunity presents itself. Grasp this seed of potential and begin channelizing it into constructive reality. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Một cơ hội tinh khôi xuất hiện. Hãy nắm lấy hạt mầm tiềm năng này và nuôi dưỡng nó thành hiện thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Hesitation, ungrounded ideas, or missed beginnings. Ground your vision before momentum dissipates. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Do dự, ý tưởng chưa có nền tảng hoặc lỡ nhịp khởi đầu. Hãy định hình lại mục tiêu trước khi nhiệt huyết phai nhạt. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "52": {
    "summary": {
      "en": "Two of Swords: Duality, early balance, decision-making, and evaluating options. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Hai Kiếm: Sự phân vân, cân nhắc lựa chọn, thiết lập thế cân bằng ban đầu. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Weigh your choices with mindfulness. Find equilibrium between two forces and plan your next steps deliberately. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Cân nhắc kỹ lưỡng các phương án. Tìm thế cân bằng và lên kế hoạch cho bước đi tiếp theo một cách điềm tĩnh. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Imbalance, indecision, or inner tension between competing demands. Make a clear choice to move forward. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Mất cân bằng, do dự không dứt hoặc giằng xé giữa hai ngả đường. Cần dứt khoát đưa ra quyết định. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "53": {
    "summary": {
      "en": "Three of Swords: Initial fruit, collaboration, expansion, and visible early progress. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Ba Kiếm: Thành quả đầu tiên, sự mở rộng, kết nối hợp tác và tiến triển cụ thể. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Your initial efforts are bearing fruit. Look outward, collaborate, and expand your horizons with confidence. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Những nỗ lực ban đầu đã đơm hoa kết trái. Hãy mở rộng tầm nhìn, kết nối hợp tác và tự tin tiến xa hơn. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Delays, creative friction, or dashed expectations. Regroup, refine your methods, and communicate clearly. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Chậm tiến độ, bất đồng trong hợp tác hoặc kỳ vọng chưa đạt. Hãy điều chỉnh phương pháp và trao đổi cởi mở hơn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "54": {
    "summary": {
      "en": "Four of Swords: Stability, structure, consolidation, and protecting established foundations. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Bốn Kiếm: Sự ổn định, củng cố nền tảng, thiết lập trật tự và bảo vệ thành quả. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Consolidate your position. Appreciate current stability and build secure structures that provide emotional or material grounding. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Củng cố vị thế hiện tại. Trân trọng sự bình ổn và xây dựng nền tảng an toàn cho chặng đường dài. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Stagnation, rigidity, or fear of stepping beyond comfort zones. Open up to necessary healthy change. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Trì trệ, bám víu vùng an toàn hoặc sự cứng nhắc quá mức. Hãy sẵn sàng đón nhận những luồng gió mới. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "55": {
    "summary": {
      "en": "Five of Swords: Challenge, tension, conflict, testing of limits, and constructive growth through friction. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Năm Kiếm: Thử thách, xung đột, sự xáo trộn thử thách bản lĩnh để trưởng thành. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Friction reveals where adjustments are needed. Treat conflict as feedback rather than defeat, and seek constructive resolution. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Va chạm giúp nhận ra điều cần chỉnh sửa. Hãy xem mâu thuẫn như phản hồi để hoàn thiện hơn, thay vì buông xuôi. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Easing of tensions, recovery from setback, or exhausting inner turmoil. Choose peace over stubborn battles. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Căng thẳng dần lắng xuống, phục hồi sau va vấp. Hãy buông bỏ những tranh cãi vô bổ để lấy lại bình yên. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "56": {
    "summary": {
      "en": "Six of Swords: Harmony regained, reciprocity, transit to calmer waters, and mutual support. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Sáu Kiếm: Lấy lại cân bằng, sự chia sẻ tương hỗ, chuyển tiếp sang vùng nước êm đềm. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Balance and grace return. Enjoy mutual cooperation, sharing of resources, and gentle forward movement. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Sự thanh thản và hòa hợp trở lại. Hãy đón nhận sự hỗ trợ lẫn nhau và tiếp tục tiến bước trong bình an. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Reluctance to move on, unresolved past attachments, or one-sided dynamics. Focus on forward healing. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Khó khăn trong việc buông bỏ quá khứ, tương tác một chiều. Hãy hướng về phía trước để chữa lành triệt để. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "57": {
    "summary": {
      "en": "Seven of Swords: Assessment, perseverance, strategic reflection, and facing inner dilemmas. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Bảy Kiếm: Đánh giá lại quá trình, sự kiên trì, suy ngẫm chiến lược và đối diện băn khoăn nội tâm. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Stand firm in your convictions while assessing long-term value. Patience and strategic honesty serve you best. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Giữ vững lập trường và đánh giá lại giá trị lâu dài. Sự kiên nhẫn và tính toán tỉnh táo là điều bạn cần lúc này. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Impatient rushing, exhaustion, or second-guessing choices. Take a breath and realign with genuine priorities. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Hấp tấp sốt ruột, kiệt sức hoặc hoài nghi bản thân. Hãy hít thở sâu và xác định lại điều gì thực sự cốt lõi. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "58": {
    "summary": {
      "en": "Eight of Swords: Mastery, dedication, accelerated movement, or deliberate transition. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Tám Kiếm: Sự tập trung rèn luyện, nhịp độ dồn dập hoặc chuyển bước dứt khoát. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Channel focus into your craft or path. Dedicated practice and decisive momentum bring notable breakthroughs. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Dồn hết tâm trí vào công việc hoặc hành trình. Sự rèn luyện tận tâm và nhịp bước dứt khoát sẽ tạo bước đột phá. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Burnout, scattered speed without purpose, or resisting necessary departure. Slow down to restore intentionality. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Kiệt sức, hành động vội vã mất phương hướng hoặc chần chừ rời bỏ điều không còn phù hợp. Cần chậm lại. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "59": {
    "summary": {
      "en": "Nine of Swords: Culmination, self-reliance, resilience, and approaching completion. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Chín Kiếm: Đỉnh cao tích lũy, sự tự chủ kiên cường, cận kề đích đến. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Draw upon your proven resilience and inner strength. You are nearly at your goal; guard your peace and stand tall. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Phát huy sức mạnh nội tại và sự kiên cường đã được trui rèn. Đích đến đã rất gần; hãy giữ vững niềm tin. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Defensiveness, paranoia, or fatigue near the finish line. Allow yourself to rest without giving up your gains. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Phòng thủ thái quá, kiệt sức ngay trước vạch đích. Cho phép mình nghỉ ngơi mà không làm mất đi thành quả. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "60": {
    "summary": {
      "en": "Ten of Swords: Full cycle completion, culmination of consequences, and transitioning to a fresh era. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Mười Kiếm: Hoàn tất chu kỳ, kết quả trọn vẹn của cả một hành trình và chuẩn bị bước sang trang mới. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "A cycle reaches its fullness. Honor the complete outcome—whether a bountiful fulfillment or the release of a heavy load. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Chu kỳ đã chạm tới đỉnh điểm trọn vẹn. Hãy ghi nhận kết quả và sẵn sàng đón nhận chu kỳ tiếp theo. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Overburdened exhaustion, denying closure, or dragging past baggage. Put down the burden and allow the end to be the end. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Quá tải gánh nặng, trốn tránh kết thúc hoặc ôm đồm quá mức. Hãy đặt gánh nặng xuống để giải phóng chính mình. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "61": {
    "summary": {
      "en": "Page of Swords: Curious exploration, student archetype, youthful enthusiasm, and fresh messages. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Tiểu Đồng Kiếm: Tính tò mò khám phá, tâm thế người học hỏi, nhiệt huyết trẻ trung và tin tức mới mẻ. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Approach your path with open curiosity and eagerness to learn. Welcome new inspirations with a beginner's enthusiasm. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Hãy tiếp cận mọi việc bằng sự tò mò trong sáng và tinh thần cầu thị. Đón nhận cảm hứng mới với lòng nhiệt thành. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Petty drama, lack of follow-through, or immature distraction. Focus your curiosity into disciplined learning. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Nông nổi, thiếu kiên định hoặc bị xao nhãng bởi những chuyện vụn vặt. Hãy biến tò mò thành kỷ luật học tập. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "62": {
    "summary": {
      "en": "Knight of Swords: Dynamic pursuit, questing energy, passionate momentum, and active dedication. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Hiệp Sĩ Kiếm: Hành động quyết liệt, năng lượng xông xáo, dấn thân vì mục tiêu. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Pursue your quest with courage, vigor, and dedicated drive. Channel passionate energy into purposeful action. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Tiến lên với lòng dũng cảm, tinh thần quyết đoán và năng lượng dồi dào. Biến nhiệt huyết thành hành động thiết thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Recklessness, erratic impulsiveness, or running hot and cold. Ground your fiery drive with strategic patience. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Hấp tấp nóng vội, bốc đồng mất kiểm soát hoặc dễ nản chí. Cần ghìm cương cảm xúc bằng sự kiên nhẫn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "63": {
    "summary": {
      "en": "Queen of Swords: Mature emotional wisdom, self-possession, nurturing mastery, and inward authority. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Hoàng Hậu Kiếm: Sự thấu suốt chín chắn, tự tin làm chủ cảm xúc, nuôi dưỡng bằng sự tinh tế và ấm áp. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Embody grounded grace, self-confidence, and intuitive stewardship. Lead from a center of quiet wisdom and emotional poise. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Tỏa ra phong thái tự tin, điềm đạm và thấu cảm. Dẫn dắt mọi việc bằng sự ấm áp và chiều sâu nội tâm. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Emotional withdrawal, insecurity, or martyrdom. Reconnect with self-love and establish clear internal sovereignty. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Khép kín cảm xúc, bất an thiếu tự tin hoặc cảm giác hy sinh vô ích. Hãy trở về chăm sóc lòng tự trắc ẩn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "64": {
    "summary": {
      "en": "King of Swords: External mastery, mature leadership, ethical oversight, and commanding expertise. Governed by Air (Intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Vua Kiếm: Bản lĩnh làm chủ, tầm nhìn lãnh đạo trưởng thành, sự thông thái và trách nhiệm vững vàng. Thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "upright": {
      "en": "Exercise calm command and mature stewardship. Guide your situation with fairness, experience, and grounded vision. Focus this energy into air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Thể hiện bản lĩnh làm chủ và sự từng trải. Dẫn dắt tình huống bằng sự công tâm, tỉnh táo và tầm nhìn xa. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    },
    "reversed": {
      "en": "Autocratic rigidity, aloof detachment, or misuse of authority. Soften your approach with empathy and humility. Watch for blocked or excessive expression in matters of air (intellect, discernment, communication, truth, and mental conflict).",
      "vi": "Độc đoán cứng nhắc, xa cách lạnh lùng hoặc lạm quyền. Hãy lắng nghe nhiều hơn với sự khiêm tốn và thấu cảm. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)."
    }
  },
  "65": {
    "summary": {
      "en": "Ace of Pentacles: The raw seed of new potential, initial inspiration, and pure elemental breakthrough. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Át Xu: Hạt mầm sơ khởi của tiềm năng mới, nguồn cảm hứng ban đầu và sự khởi phát thuần khiết. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "A pristine opportunity presents itself. Grasp this seed of potential and begin channelizing it into constructive reality. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Một cơ hội tinh khôi xuất hiện. Hãy nắm lấy hạt mầm tiềm năng này và nuôi dưỡng nó thành hiện thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Hesitation, ungrounded ideas, or missed beginnings. Ground your vision before momentum dissipates. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Do dự, ý tưởng chưa có nền tảng hoặc lỡ nhịp khởi đầu. Hãy định hình lại mục tiêu trước khi nhiệt huyết phai nhạt. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "66": {
    "summary": {
      "en": "Two of Pentacles: Duality, early balance, decision-making, and evaluating options. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Hai Xu: Sự phân vân, cân nhắc lựa chọn, thiết lập thế cân bằng ban đầu. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Weigh your choices with mindfulness. Find equilibrium between two forces and plan your next steps deliberately. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Cân nhắc kỹ lưỡng các phương án. Tìm thế cân bằng và lên kế hoạch cho bước đi tiếp theo một cách điềm tĩnh. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Imbalance, indecision, or inner tension between competing demands. Make a clear choice to move forward. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Mất cân bằng, do dự không dứt hoặc giằng xé giữa hai ngả đường. Cần dứt khoát đưa ra quyết định. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "67": {
    "summary": {
      "en": "Three of Pentacles: Initial fruit, collaboration, expansion, and visible early progress. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Ba Xu: Thành quả đầu tiên, sự mở rộng, kết nối hợp tác và tiến triển cụ thể. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Your initial efforts are bearing fruit. Look outward, collaborate, and expand your horizons with confidence. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Những nỗ lực ban đầu đã đơm hoa kết trái. Hãy mở rộng tầm nhìn, kết nối hợp tác và tự tin tiến xa hơn. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Delays, creative friction, or dashed expectations. Regroup, refine your methods, and communicate clearly. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Chậm tiến độ, bất đồng trong hợp tác hoặc kỳ vọng chưa đạt. Hãy điều chỉnh phương pháp và trao đổi cởi mở hơn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "68": {
    "summary": {
      "en": "Four of Pentacles: Stability, structure, consolidation, and protecting established foundations. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Bốn Xu: Sự ổn định, củng cố nền tảng, thiết lập trật tự và bảo vệ thành quả. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Consolidate your position. Appreciate current stability and build secure structures that provide emotional or material grounding. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Củng cố vị thế hiện tại. Trân trọng sự bình ổn và xây dựng nền tảng an toàn cho chặng đường dài. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Stagnation, rigidity, or fear of stepping beyond comfort zones. Open up to necessary healthy change. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Trì trệ, bám víu vùng an toàn hoặc sự cứng nhắc quá mức. Hãy sẵn sàng đón nhận những luồng gió mới. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "69": {
    "summary": {
      "en": "Five of Pentacles: Challenge, tension, conflict, testing of limits, and constructive growth through friction. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Năm Xu: Thử thách, xung đột, sự xáo trộn thử thách bản lĩnh để trưởng thành. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Friction reveals where adjustments are needed. Treat conflict as feedback rather than defeat, and seek constructive resolution. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Va chạm giúp nhận ra điều cần chỉnh sửa. Hãy xem mâu thuẫn như phản hồi để hoàn thiện hơn, thay vì buông xuôi. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Easing of tensions, recovery from setback, or exhausting inner turmoil. Choose peace over stubborn battles. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Căng thẳng dần lắng xuống, phục hồi sau va vấp. Hãy buông bỏ những tranh cãi vô bổ để lấy lại bình yên. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "70": {
    "summary": {
      "en": "Six of Pentacles: Harmony regained, reciprocity, transit to calmer waters, and mutual support. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Sáu Xu: Lấy lại cân bằng, sự chia sẻ tương hỗ, chuyển tiếp sang vùng nước êm đềm. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Balance and grace return. Enjoy mutual cooperation, sharing of resources, and gentle forward movement. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Sự thanh thản và hòa hợp trở lại. Hãy đón nhận sự hỗ trợ lẫn nhau và tiếp tục tiến bước trong bình an. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Reluctance to move on, unresolved past attachments, or one-sided dynamics. Focus on forward healing. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Khó khăn trong việc buông bỏ quá khứ, tương tác một chiều. Hãy hướng về phía trước để chữa lành triệt để. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "71": {
    "summary": {
      "en": "Seven of Pentacles: Assessment, perseverance, strategic reflection, and facing inner dilemmas. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Bảy Xu: Đánh giá lại quá trình, sự kiên trì, suy ngẫm chiến lược và đối diện băn khoăn nội tâm. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Stand firm in your convictions while assessing long-term value. Patience and strategic honesty serve you best. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Giữ vững lập trường và đánh giá lại giá trị lâu dài. Sự kiên nhẫn và tính toán tỉnh táo là điều bạn cần lúc này. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Impatient rushing, exhaustion, or second-guessing choices. Take a breath and realign with genuine priorities. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Hấp tấp sốt ruột, kiệt sức hoặc hoài nghi bản thân. Hãy hít thở sâu và xác định lại điều gì thực sự cốt lõi. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "72": {
    "summary": {
      "en": "Eight of Pentacles: Mastery, dedication, accelerated movement, or deliberate transition. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Tám Xu: Sự tập trung rèn luyện, nhịp độ dồn dập hoặc chuyển bước dứt khoát. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Channel focus into your craft or path. Dedicated practice and decisive momentum bring notable breakthroughs. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Dồn hết tâm trí vào công việc hoặc hành trình. Sự rèn luyện tận tâm và nhịp bước dứt khoát sẽ tạo bước đột phá. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Burnout, scattered speed without purpose, or resisting necessary departure. Slow down to restore intentionality. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Kiệt sức, hành động vội vã mất phương hướng hoặc chần chừ rời bỏ điều không còn phù hợp. Cần chậm lại. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "73": {
    "summary": {
      "en": "Nine of Pentacles: Culmination, self-reliance, resilience, and approaching completion. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Chín Xu: Đỉnh cao tích lũy, sự tự chủ kiên cường, cận kề đích đến. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Draw upon your proven resilience and inner strength. You are nearly at your goal; guard your peace and stand tall. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Phát huy sức mạnh nội tại và sự kiên cường đã được trui rèn. Đích đến đã rất gần; hãy giữ vững niềm tin. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Defensiveness, paranoia, or fatigue near the finish line. Allow yourself to rest without giving up your gains. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Phòng thủ thái quá, kiệt sức ngay trước vạch đích. Cho phép mình nghỉ ngơi mà không làm mất đi thành quả. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "74": {
    "summary": {
      "en": "Ten of Pentacles: Full cycle completion, culmination of consequences, and transitioning to a fresh era. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Mười Xu: Hoàn tất chu kỳ, kết quả trọn vẹn của cả một hành trình và chuẩn bị bước sang trang mới. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "A cycle reaches its fullness. Honor the complete outcome—whether a bountiful fulfillment or the release of a heavy load. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Chu kỳ đã chạm tới đỉnh điểm trọn vẹn. Hãy ghi nhận kết quả và sẵn sàng đón nhận chu kỳ tiếp theo. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Overburdened exhaustion, denying closure, or dragging past baggage. Put down the burden and allow the end to be the end. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Quá tải gánh nặng, trốn tránh kết thúc hoặc ôm đồm quá mức. Hãy đặt gánh nặng xuống để giải phóng chính mình. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "75": {
    "summary": {
      "en": "Page of Pentacles: Curious exploration, student archetype, youthful enthusiasm, and fresh messages. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Tiểu Đồng Xu: Tính tò mò khám phá, tâm thế người học hỏi, nhiệt huyết trẻ trung và tin tức mới mẻ. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Approach your path with open curiosity and eagerness to learn. Welcome new inspirations with a beginner's enthusiasm. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Hãy tiếp cận mọi việc bằng sự tò mò trong sáng và tinh thần cầu thị. Đón nhận cảm hứng mới với lòng nhiệt thành. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Petty drama, lack of follow-through, or immature distraction. Focus your curiosity into disciplined learning. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Nông nổi, thiếu kiên định hoặc bị xao nhãng bởi những chuyện vụn vặt. Hãy biến tò mò thành kỷ luật học tập. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "76": {
    "summary": {
      "en": "Knight of Pentacles: Dynamic pursuit, questing energy, passionate momentum, and active dedication. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Hiệp Sĩ Xu: Hành động quyết liệt, năng lượng xông xáo, dấn thân vì mục tiêu. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Pursue your quest with courage, vigor, and dedicated drive. Channel passionate energy into purposeful action. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Tiến lên với lòng dũng cảm, tinh thần quyết đoán và năng lượng dồi dào. Biến nhiệt huyết thành hành động thiết thực. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Recklessness, erratic impulsiveness, or running hot and cold. Ground your fiery drive with strategic patience. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Hấp tấp nóng vội, bốc đồng mất kiểm soát hoặc dễ nản chí. Cần ghìm cương cảm xúc bằng sự kiên nhẫn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "77": {
    "summary": {
      "en": "Queen of Pentacles: Mature emotional wisdom, self-possession, nurturing mastery, and inward authority. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Hoàng Hậu Xu: Sự thấu suốt chín chắn, tự tin làm chủ cảm xúc, nuôi dưỡng bằng sự tinh tế và ấm áp. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Embody grounded grace, self-confidence, and intuitive stewardship. Lead from a center of quiet wisdom and emotional poise. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Tỏa ra phong thái tự tin, điềm đạm và thấu cảm. Dẫn dắt mọi việc bằng sự ấm áp và chiều sâu nội tâm. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Emotional withdrawal, insecurity, or martyrdom. Reconnect with self-love and establish clear internal sovereignty. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Khép kín cảm xúc, bất an thiếu tự tin hoặc cảm giác hy sinh vô ích. Hãy trở về chăm sóc lòng tự trắc ẩn. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  },
  "78": {
    "summary": {
      "en": "King of Pentacles: External mastery, mature leadership, ethical oversight, and commanding expertise. Governed by Earth (Material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Vua Xu: Bản lĩnh làm chủ, tầm nhìn lãnh đạo trưởng thành, sự thông thái và trách nhiệm vững vàng. Thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "upright": {
      "en": "Exercise calm command and mature stewardship. Guide your situation with fairness, experience, and grounded vision. Focus this energy into earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Thể hiện bản lĩnh làm chủ và sự từng trải. Dẫn dắt tình huống bằng sự công tâm, tỉnh táo và tầm nhìn xa. Hướng năng lượng này vào các khía cạnh thuộc nguyên tố Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    },
    "reversed": {
      "en": "Autocratic rigidity, aloof detachment, or misuse of authority. Soften your approach with empathy and humility. Watch for blocked or excessive expression in matters of earth (material reality, resources, bodily health, craft, and grounded progress).",
      "vi": "Độc đoán cứng nhắc, xa cách lạnh lùng hoặc lạm quyền. Hãy lắng nghe nhiều hơn với sự khiêm tốn và thấu cảm. Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)."
    }
  }
};

export function getCardMeaning(cardId: string): CardMeaningDetail | undefined {
  return CARD_MEANINGS[cardId];
}
