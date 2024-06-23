import gradio as gr
import openai

openai.api_key = ''

def answer(state, state_chatbot, text):
    messages = state + [{
        'role': 'user',
        'content': text
    }] 

    res = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=messages
    )

    msg = res['choices'][0]['message']['content']

    new_state = [{
        'role': 'user',
        'content': text
    }, {
        'role': 'assistant',
        'content': msg
    }]

    state = state + new_state
    state_chatbot = state_chatbot + [(text, msg)]

    print(state)

    return state, state_chatbot, state_chatbot

with gr.Blocks(css='#chatbot .overflow-y-auto{height:750px}') as demo:
    state = gr.State([{
        'role': 'system',
        'content': 'You are a helpful assistant.'
    }])
    state_chatbot = gr.State([])

    with gr.Row():
        gr.HTML(f"""<div style="text-align: center; max-width: 500px; margin: 20px auto; padding: 20px; border-radius: 15px; background-color: #f9f9f9; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    <div>
        <h1 style="font-size: 2.5em; color: #333; margin-bottom: 10px;">GPUHunt</h1>
    </div>
    <p style="margin-bottom: 10px; font-size: 1em; color: #666;">
        무엇이든 물어보세요! 
    </p>
</div>
""")

    with gr.Row():
        chatbot = gr.Chatbot(elem_id='chatbot')

    with gr.Row():
        txt = gr.Textbox(show_label=False, placeholder='Send a message...', elem_id='txt')

    demo.load(None, [state, state_chatbot])
    txt.submit(answer, [state, state_chatbot, txt], [state, state_chatbot, chatbot])
    txt.submit(lambda: '', None, txt)

demo.launch(debug=True, share=True)
